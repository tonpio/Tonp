import { Address, beginCell, fromNano, toNano } from '@ton/core';
import { NftCollection } from '../wrappers/NftCollection';
import { NftItem } from '../wrappers/NftItem';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const version = 3n;

    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "https://tonp.io/nft/"; 
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    const nftCollection = provider.open(await NftCollection.fromInit(version, newContent));

    /*await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.02'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nftCollection.address);*/

    //const next_item = nftCollection.getGetNextItem();
    
    /*await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.02'),
        },
        {
            $$type: 'UpdateCosts',
            storage: toNano("0.02"),
            consumption: toNano("0.02"),
            value: toNano("9.95"),
        }
    );*/

    /*await nftCollection.send(
        provider.sender(),
        {
            value: toNano("0.01")
        },
        {
            $$type: 'WithdrawSafe',
            idx: 1n
        }
    );*/

    //console.log("collection owner = ", await nftCollection.getOwner());
    //console.log("collection value = ", fromNano(await nftCollection.getGetValue()));


    // run methods on `nftCollection`
}
