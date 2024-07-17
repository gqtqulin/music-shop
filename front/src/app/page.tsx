"use client";

import 'module-alias/register';

import React, { useState, useEffect, FormEvent } from "react";

import { ethers } from "ethers";
import { MusicShop__factory } from "@/app/typechain";
import type { MusicShop } from "@/typechain";
import type { BrowserProvider } from "ethers";

import ConnectWallet from "@/app/components/ConnectWallet";
import WaitingForTransactionMessage from "@/app/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/app/components/TransactionErrorMessage";

const HARDHAT_NETWORK_ID = "0x539";
const MUSIC_SHOP_ADDRESS = "0x5fb000000";

declare let window: any;

export default function Home() {
  return (
    <main>
      
    </main>
  );
};
