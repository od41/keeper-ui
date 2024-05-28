import { createPublicClient, http, getContract, WalletClient } from "viem";
import { cantoTestnet } from "@/web3/chain";
import { canto } from "viem/chains";
import keeperPoolAbi from "./abis/keeper-abi.json";
import keeperSlipAbi from "./abis/keeper-slip-abi.json";
import kusdAbi from "./abis/kusd-abi.json";

const chain = process.env.NODE_ENV == "production" ? canto : cantoTestnet;
const keeperPoolAddress =
  process.env.NODE_ENV == "production"
    ? "0xcanto"
    : "0x8c204AeEED660FbdA7DDb2eE0D2611EaCf991F3f";
const kusdAddress =
  process.env.NODE_ENV == "production"
    ? "0xcanto"
    : "0x987D567B56b3186f0fea777Bc3c5723DDb52bfB8";

const client = createPublicClient({
  chain,
  transport: http(),
});

export const KeeperPool = (walletClient: WalletClient) => {
  return getContract({
    address: keeperPoolAddress,
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
  address: kusdAddress,
  client,
  abi: kusdAbi,
});
