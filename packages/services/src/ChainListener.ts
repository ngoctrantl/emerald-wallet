import {
  BlockchainClient, ChainHead,
  ChainSpec, chainByCode, CHAINS,
  ClientReadable
} from '@emeraldplatform/grpc';

import extractChain from "./extractChain";

type ChainStatus = {
  height: number,
  hash: string
}

interface HeadListener {
  (status: ChainStatus): void;
}

export class ChainListener {
  client: BlockchainClient;
  response?: ClientReadable<ChainHead>;

  constructor(client: BlockchainClient) {
    this.client = client;
  }

  stop() {
    if (this.response) {
      this.response.cancel();
    }
    this.response = undefined;
  }

  subscribe(chainCode: string, handler: HeadListener) {
    const chain = extractChain(chainCode);
    if (chain.code == CHAINS.UNSPECIFIED.code) {
      console.warn("Unknown chain: ", chainCode, "Ignoring.");
      return;
    }
    const request = chain.toProtobuf();
    this.client.streamHead(request, (response: ClientReadable<ChainHead>) => {
      response.on('data', (data: ChainHead) => {
        // console.log(`New blockchain height. Chain: ${data.getChain()}, height: ${data.getHeight()}`);
        if (handler) {
          handler({height: data.getHeight(), hash: data.getBlockId()})
        }
      });
      this.response = response;
    })
  }
}
