import {
  AssetConfig,
  AxelarQueryAPI,
  ChainInfo,
} from "@axelar-network/axelarjs-sdk";

import Big from "big.js";
import { formatUnits } from "ethers/lib/utils.js";
import { AssetConfigExtended } from "types";

import { ENVIRONMENT } from "../config/constants";

export async function renderGasFee(
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
  const feeQuery = await axelarQueryApi
    .getTransferFee(srcChain?.id, destChain?.id, asset?.id as string, 0)
    .then((res) => formatUnits(res.fee?.amount as string, asset?.decimals))
    .catch((e) => null);
  if (feeQuery) return feeQuery;

  if (!srcChain || !destChain) return "";

  const sourceChainName = srcChain.chainName?.toLowerCase();
  const destChainName = destChain.chainName?.toLowerCase();

  const sourceFee = asset?.chain_aliases[sourceChainName]?.minDepositAmt;
  const destFee = asset?.chain_aliases[destChainName]?.minDepositAmt;

  if (!sourceFee || !destFee) return "0";
  return Big(sourceFee).add(Big(destFee)).toString();
}
