import React from "react";
import { Blockable, ConnectIndicator, InputWrapper } from "../common";
import {
  ActionButton,
  ChainSwapper,
  DestChainSelector,
  SourceChainSelector,
  StopButton,
  SwapStates,
  TokenSelector,
} from "./parts";

import { usePreventDuplicateChains } from "../../hooks";
import { TopFlows } from "./parts/TopFlows";
import { EvmAssetWarningModal, ModalWindow } from "../modal";

export const SwapBox = () => {
  usePreventDuplicateChains();

  return (
    <div className="bg-base-100 rounded-xl w-[500px] min-h-[500px] h-auto">
      <ModalWindow />
      <EvmAssetWarningModal />
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div className="relative flex justify-between mb-0 space-x-8">
          <ConnectIndicator />
          <div className="flex gap-x-4">
            <StopButton />
            <Blockable>
              <TopFlows />
            </Blockable>
          </div>
        </div>

        {/* <OriginSwapper /> */}

        <Blockable>
          <div className="flex justify-between">
            <InputWrapper>
              <SourceChainSelector />
            </InputWrapper>
            <div className="relative z-40 flex items-center -mx-2">
              <ChainSwapper />
            </div>
            <InputWrapper>
              <DestChainSelector />
            </InputWrapper>
          </div>
        </Blockable>

        <InputWrapper>
          <TokenSelector />
        </InputWrapper>

        <SwapStates />

        <div className="pt-2">
          <ActionButton />
        </div>
      </div>
    </div>
  );
};
