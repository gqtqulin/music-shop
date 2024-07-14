import { loadFixture, ethers, expect } from "./setup";

describe("MusicShop", () => {

    const deploy = async () => {
        const [owner, buyer] = await ethers.getSigners();

        const MusicShop = await ethers.getContractFactory("MusicShop");
        const shop = await MusicShop.deploy(owner.address);

        await shop.waitForDeployment();

        return {
            shop, owner, buyer
        }
    }

    it("should allow to add albums", async () => {
        const { shop } = await loadFixture(deploy);

        const title = "Demo";
        const price = 100;
        const uid = ethers.solidityPackedKeccak256(["string"], [title]);
        const qty = 5;
        const initialIndex = 0;

        const addTx = await shop.addAlbum(uid, title, price, qty);
        await addTx.wait();

        const album = await shop.albums(initialIndex);

        expect(album.index).to.eq(initialIndex);
        expect(album.uid).to.eq(uid);
        expect(album.title).to.eq(title);
        expect(album.price).to.eq(price);
        expect(album.quantity).to.eq(qty);

        expect(await shop.currentIndex()).to.eq(initialIndex + 1);
    })

})