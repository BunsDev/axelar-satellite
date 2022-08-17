import {
  AssetConfig,
  ChainInfo,
  loadAssets,
  loadChains,
} from "@axelar-network/axelarjs-sdk";
import { useEffect } from "react";
import { ENVIRONMENT as environment } from "../config/constants";
import { useSwapStore } from "../store";

export const useInitialChainList = () => {
  const {
    setAllChains,
    setSrcChain,
    setDestChain,
    setAllAssets,
    setAsset,
    setReservedAddressesList,
  } = useSwapStore();

  useEffect(() => {
    Promise.all([loadInitialChains(), loadInitialAssets()]);
  }, []);

  function loadInitialChains() {
    return loadChains({ environment }).then((chains) => {
      setAllChains(chains);
      setSrcChain(
        chains.find(
          (chain) => chain.chainName.toLowerCase() === "avalanche"
        ) as ChainInfo
      );
      setDestChain(
        chains.find(
          (chain) => chain.chainName.toLowerCase() === "moonbeam"
        ) as ChainInfo
      );
    });
  }

  function loadInitialAssets() {
    return loadAssets({ environment }).then((assets: AssetConfig[]) => {
      setAllAssets(assets);

      /**get the list of token addresses from the assets json */
      setReservedAddressesList(
        assets.reduce(
          (a: string[], b: AssetConfig) => [
            ...a,
            ...(Object.values(b.chain_aliases).map(
              (chain) => chain.tokenAddress
            ) as string[]),
          ],
          [] as string[]
        )
      );
      setAsset(
        assets.find((asset) =>
          asset?.common_key[environment].includes("usdc")
        ) as AssetConfig
      );
    });
  }
};
