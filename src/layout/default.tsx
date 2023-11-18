import Image from "next/image";
import { Inter } from "next/font/google";

import React, { useState,useEffect } from "react";
import Header from "@/components/header";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import pb from "@/lib/pocketbase";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const isValid = pb.authStore.isValid
  
  useEffect(() => {
    if(!isValid){
      pb.collection("users").authWithPassword("admin",process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string).then((res)=>{
        console.log("res",res);
      })
    }
  }, [isValid])
  
  const {wallet, publicKey, connected} = useWallet();
  return (
    <main
      className={`flex min-h-screen flex-col text-black items-center justify-between gap-3 p-4 ${inter.className}`}
    >
      <Header />
      <div className="flex flex-col justify-start w-full min-h-[calc(100vh-7.5rem)] gap-6 pt-2 max-w-7xl relative">
        <div className="flex flex-col justify-center w-full items-center ">
          <div className="bg-purple-400 h-[21vh] text-white  w-full rounded-2xl flex justify-center items-center">
            <h1>{title}</h1>
          </div>
        </div>

        {children}
      </div>
      <footer className="h-fit">Footer</footer>
    </main>
  );
}
