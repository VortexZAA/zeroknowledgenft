import Image from "next/image";
import { Inter } from "next/font/google";
import HeaderRightArea from "@/components/connectBtn";
import { useState } from "react";
import Layout from "@/layout/default";
import Card from "@/components/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <Layout title="Marketplace">
      <div className="flex w-full justify-center">
        <div className="h-10 flex w-2/3 gap-6 -mt-11 z-10">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full rounded-full shadow outline-none px-6"
            placeholder="Enter NTF id..."
          />
          <button className=" transition-all bg-[#7EC6D2] px-8 shrink-0 h-full rounded-full hover:bg-gray-700 text-white">
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        <Card img="" name="NFT 1" creator="Creator 1" price={100} />
      </div>
    </Layout>
  );
}


