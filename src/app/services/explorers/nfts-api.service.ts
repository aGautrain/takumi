import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/*
    Service pour récupérer les NFTs d'une adresse + les metadonnées associées
 */

export interface NFTCollectionResult {
  ownedNfts: OwnedNFT[];
  total_count: number;
}

// interface écrite en observant le retour de l'API Alchemy
export interface OwnedNFT {
  contract: { address: string };
  id: {
    tokenId: string;
    tokenMetadata: { tokenType: string };
  };
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
    attributes?: Array<{ value: string; trait_type: string }>;
  };
  media: Array<{ raw: string; gateway: string }>;
  timeLastUpdated: string;

  error?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class NftsApiService {
  private API_ENDPOINT = 'https://eth-mainnet.alchemyapi.io';

  constructor(private http: HttpClient) {}

  // https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts
  getNFTS(address: string): Promise<NFTCollectionResult> {
    return this.http
      .get<NFTCollectionResult>(
        `${this.API_ENDPOINT}/v2/demo/getNFTs?owner=${address}`
      )
      .pipe(
        map((response) => {
          // on exclue les NFTS qui ne sont pas ERC721, ou ceux qui n'ont pas pu être bien récupéré
          response.ownedNfts = response.ownedNfts.filter(
            (nft) =>
              !nft?.error && nft?.id?.tokenMetadata?.tokenType === 'ERC721'
          );

          response.ownedNfts = response.ownedNfts.map((nft) => {
            // les NFTS Reactor ont un problème d'url (ils ont thumbnails/XXX au lieu de thumbnails_cars/XXX, corrigé manuellement ici
            if (
              nft?.contract?.address ===
              '0x6f9eb87f5a5638a3424c68ffae824608671f4ea6'
            ) {
              nft.media[0].gateway = nft.media[0].gateway.replace(
                'thumbnails',
                'thumbnails_cars'
              );
            }

            return nft;
          });

          return response;
        })
      )
      .toPromise() as Promise<NFTCollectionResult>;
  }
}
