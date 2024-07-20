"use client";

import 'module-alias/register';

import React, { useState, useEffect, FormEvent } from "react";

import { ethers } from "ethers";
import { MusicShop__factory } from "../../../typechain-types/factories/MusicShop__factory";
import type { MusicShop } from "../../../typechain-types/MusicShop";
import type { BrowserProvider } from "ethers";

import ConnectWallet from "@/app/components/ConnectWallet";
import WaitingForTransactionMessage from "@/app/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/app/components/TransactionErrorMessage";

const HARDHAT_NETWORK_ID = "0x539";                                 // -- chain hardhat id
const MUSIC_SHOP_ADDRESS = "0x5fb000000";                           // -- music shop address

declare let window: any;

type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  shop: MusicShop | undefined;
  signer: ethers.JsonRpcSigner | undefined;
};

export default function Home() {
  const [networkError, setNetworkError] = useState<string>();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [transactionError, setTransactionError] = useState<any>();
  const [currentConnectiion, setCurrentConnection] = useState<CurrentConnectionProps>();

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      setNetworkError("Please install Metamask!");
      return;
    }

    if (!(await _checkNetwork())) {
      return;
    }

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await _initialize(selectedAddress);

    window.ethereum.on(
      "accountChanged",
      async ([newAccount]: [newAccount: string]) => {
        if (newAccount === undefined) {
          return _resetState();
        }

        await _initialize(newAccount);
      }
    );

    window.ethereum.on(
      "chainChanged", 
      ([_networkId]: any) => {
        _resetState();
      }
    );
  };

  /**
   * оборачивает window.ethereum в ethers
   * устанавливает соединение с контрактом
   * @param selectedAccount {string} - адрес
   */
  const _initialize = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    setCurrentConnection({
      ...currentConnectiion,
      provider, 
      signer,
      shop: MusicShop__factory.connect(MUSIC_SHOP_ADDRESS, signer),
    });
  };

  /**
   * сброс всех стейтов
   */
  const _resetState = () => {
    setNetworkError(undefined);
    setTransactionError(undefined);
    setTxBeingSent(undefined);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
      shop: undefined,
    });
  };

  /**
   * проверка на сеть 
   * @returns {Promise<boolean>} - ответ подключен ли к hardhat сети
   */
  const _checkNetwork = async (): Promise<boolean> => {
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chosenChainId === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError("Please connect to Hardhat network (localhost:8545)!");
    return false;
  }

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  const _dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const _getRpcErrorMessage = (error: any): string => {
    console.log(error);
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  return (
    <main>
      {!currentConnectiion?.signer && (
        <ConnectWallet 
          connectWallet={_connectWallet}
          networkError={networkError}
          dismiss={_dismissNetworkError}
        />
      )}

      {currentConnectiion?.signer && (
        <p>Your address: {currentConnectiion.signer.address}</p>
      )}

      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

      {transactionError && (
        <TransactionErrorMessage
          message={_getRpcErrorMessage(transactionError)}
          dismiss={_dismissTransactionError}
        />
      )}
    </main>
  );
};