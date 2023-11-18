import "@/styles/globals.css";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Zero Knowledge NFT",
      }),
    ],
    []
  );
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>Zero Knowledge NFT</title>
      </Head>
      <WalletProvider
        wallets={wallets}
        decryptPermission={DecryptPermission.UponRequest}
        network={WalletAdapterNetwork.Testnet}
        autoConnect
      >
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </>
  );
}
