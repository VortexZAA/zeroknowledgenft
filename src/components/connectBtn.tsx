import { WalletMultiButton, WalletConnectButton } from "@demox-labs/aleo-wallet-adapter-reactui";
require("@demox-labs/aleo-wallet-adapter-reactui/dist/styles.css");
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { DecryptPermission } from "@demox-labs/aleo-wallet-adapter-base";
import {useEffect,useState} from "react";
export default function HeaderRightArea() {
  //const address =
  const { wallet, publicKey, connected, connect } = useWallet();
  // auto connect
  

  return (
    <div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8">
      <WalletMultiButton className="!bg-gray-800 hover:!bg-gray-700 !text-white" />
    </div>
  );
}
