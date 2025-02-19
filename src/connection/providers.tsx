import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
export const readOnlyProvider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

// const wssRpcUrl = process.env.NEXT_PUBLIC_WSS_RPC_URL;
// if (!wssRpcUrl) {
//   throw new Error("NEXT_PUBLIC_WSS_RPC_URL is not defined");
// }

// export const wssProvider = new ethers.WebSocketProvider(wssRpcUrl);

export const getProvider = (provider: Eip1193Provider | any | undefined) => {
  if (provider) {
    return new ethers.BrowserProvider(provider);
  }
};
