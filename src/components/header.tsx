import HeaderRightArea from "@/components/connectBtn";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import Link from "next/link";

export default function Header() {
  const {wallet, publicKey, connected} = useWallet();
  return (
    <header className="flex w-full  justify-between items-center h-fit max-w-7xl">
      <div className="flex items-center gap-4 ">
        {/* <Image src="/logo.svg" alt="logo" width={40} height={40} /> */}
        <Link href="/">
          <h1 className="text-xl font-bold">Zero Knowledge NFT</h1>
        </Link>
      </div>
      <div className=" flex gap-6">
        {connected &&<a
          href="/create"
          className=" flex justify-center items-center transition-all bg-[#7EC6D2] px-8 shrink-0 h-12 rounded-md hover:bg-gray-700 text-white font-medium"
        >
          Create Nft
        </a>}
        <HeaderRightArea />
      </div>
    </header>
  );
}
