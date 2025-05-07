import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import type { CryptoAsset } from './types';

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950847,
      circulatingSupply: 19.85,
      maxSupply: 21,
      logo: '/crypto-icons/btc.svg',
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547468307,
      circulatingSupply: 120.71,
      maxSupply: null,
      logo: '/crypto-icons/eth.svg',
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      logo: '/crypto-icons/usdt.svg',
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      logo: '/crypto-icons/xrp.svg',
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.69,
      maxSupply: 200,
      logo: '/crypto-icons/bnb.svg',
    },
  ],
  status: 'idle',
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ id: number; price: number; changes: { [key: string]: number } }>) => {
      const asset = state.assets.find(a => a.id === action.payload.id);
      if (asset) {
        asset.price = action.payload.price;
        asset.change1h = action.payload.changes['1h'];
        asset.change24h = action.payload.changes['24h'];
        asset.change7d = action.payload.changes['7d'];
      }
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export const selectAssets = (state: RootState) => state.crypto.assets as CryptoAsset[];
export default cryptoSlice.reducer;
