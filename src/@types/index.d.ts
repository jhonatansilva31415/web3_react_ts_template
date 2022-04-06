import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from 'ethers';

declare global {
  interface Window {
    //ethereum: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc,
    ethereum: MetaMaskInpageProvider
  }
}