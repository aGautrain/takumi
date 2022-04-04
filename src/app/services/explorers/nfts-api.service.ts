import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {nftsMocked} from "../cryptocurrencies.mock";
import {map} from "rxjs/operators";

export interface NFTCollectionResult {
  ownedNfts: OwnedNFT[];
  total_count: number;
}

export interface OwnedNFT {
  contract: { address: string; };
  id: {
    tokenId: string;
    tokenMetadata: { tokenType: string; }
  },
  title: string;
  description: string;
  balance: string;
  tokenUri: {
    raw: string;
    gateway: string;
  };
  metadata: {
    name?: string;
    description?: string;
    image?: string;
    animation_url?: string;
    external_url?: string;
    attributes?: Array<{ value: string; trait_type: string; }>;
  };
  media: Array<{ raw: string; gateway: string; }>;
  timeLastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class NftsApiService {

  private API_ENDPOINT = 'https://eth-mainnet.alchemyapi.io';

  constructor(private http: HttpClient) { }

  // https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts
  getNFTS(address: string): Promise<NFTCollectionResult> {

    // TODO remove mock
    return new Promise((resolve) => resolve(nftsMocked));

    return this.http.get<NFTCollectionResult>(
      `${this.API_ENDPOINT}/v2/demo/getNFTs?owner=${address}`
    ).toPromise() as Promise<NFTCollectionResult>;
  }
}
