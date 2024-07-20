

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const MusicShop = buildModule("MusicShop", (m: any) => {
    
    const shop = m.contract("MusicShop");

    return { shop };

});

export default MusicShop;