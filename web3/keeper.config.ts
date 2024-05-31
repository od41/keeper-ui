import { createPublicClient, http, getContract, WalletClient } from "viem";

import { cantoTestnet } from "@/web3/chain";
import { canto } from "viem/chains";
import keeperPoolAbi from "./abis/keeper-pool-abi";
import keeperSlipAbi from "./abis/keeper-slip-abi";
import kusdAbi from "./abis/kusd-abi";

const chain = process.env.NODE_ENV == "production" ? canto : cantoTestnet;
export const KEEPER_POOL_ADDRESS =
  process.env.NODE_ENV == "production"
    ? "0xcanto"
    : "0xc8fC4EE945d76c6081EFCf48750aCd69e618757B";
export const KUSD_ADDRESS =
  process.env.NODE_ENV == "production"
    ? "0xcanto"
    : "0x987D567B56b3186f0fea777Bc3c5723DDb52bfB8";

export const CNOTE_ADDRESS =
  process.env.NODE_ENV == "production"
    ? "0xcanto"
    : "0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f";

const client = createPublicClient({
  chain,
  transport: http(),
});

export const KeeperPool = (walletClient: WalletClient) => {
  return getContract({
    address: KEEPER_POOL_ADDRESS,
    client: {
      public: client,
      wallet: walletClient ? walletClient : undefined,
    },
    abi: keeperPoolAbi,
  });
};

export const KeeperSlip = (
  _address: `0x${string}`,
  walletClient: WalletClient
) => {
  return getContract({
    address: _address,
    client: {
      public: client,
      wallet: walletClient ? walletClient : undefined,
    },
    abi: keeperSlipAbi,
  });
};

export const KUSDContract = getContract({
  address: KUSD_ADDRESS,
  client,
  abi: kusdAbi,
});

export const EIGHTEEN_DECIMALS = 10 ** 18;
