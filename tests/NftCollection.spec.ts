import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { beginCell, fromNano, toNano } from '@ton/core';
import { NftCollection } from '../wrappers/NftCollection';
import '@ton/test-utils';
import { NftItem } from '../wrappers/NftItem';

describe('NftCollection', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftCollection: SandboxContract<NftCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const version = 0n;

        const OFFCHAIN_CONTENT_PREFIX = 0x01;
        const string_first = "https://tonp.io/nft/"; 
        let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

        nftCollection = blockchain.openContract(await NftCollection.fromInit(version, newContent));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nftCollection.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftCollection are ready to use
    });

    it('should mint', async () => {
        const user = await blockchain.treasury("user");

        const res = await nftCollection.send(
            user.getSender(),
            {
                value: toNano("10.06")
            },
            "tonsite"
        )     

        const ItemAddress = await nftCollection.getGetNftAddressByIndex(0n);

        expect(res.transactions).toHaveTransaction({
            from: user.address,
            to: nftCollection.address,
            success: true,
        });        
        
        expect(res.transactions).toHaveTransaction({
            from: nftCollection.address,
            to: ItemAddress,
            deploy: true,
            success: true,
        });

        const nftItem = blockchain.openContract(await NftItem.fromAddress(ItemAddress));

        console.log("item data = ", await nftItem.getGetFullNftData());
        console.log("itemm metadata json filename = ", (await nftItem.getGetNftData()).individual_content.beginParse().loadStringTail());

    });
});
