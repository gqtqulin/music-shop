

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";


const MusicShop = buildModule("MusicShop", (m: any) => {

    const strAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // -- вставить сюда того, кто будет owner'ом 

    const address = ethers.getAddress(strAddress);
    
    const shop = m.contract("MusicShop", [address]);

    return { shop };

});

export default MusicShop;