import Image from "next/image";
import { Inter } from "next/font/google";
import HeaderRightArea from "@/components/connectBtn";
import { useState, useEffect } from "react";
import Layout from "@/layout/default";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useRouter } from "next/router";
import { ToastError, ToastSuccess } from "@/components/alert/SweatAlert";
import pb from "@/lib/pocketbase";
import Loader from "@/components/Loader";
import Card from "@/components/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { wallet, publicKey, connected, connect } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  useEffect(() => {
    checkAddress();
  }, [connected]);

  async function checkAddress() {
    try {
      const res = await pb
        .collection("web3_users")
        .getFirstListItem(`address="${publicKey}"`);
      console.log(res);
      if (res) {
        router.push("/create-nft");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title="Create NFT">
      {loading && <Loader />}
      <div className="w-full flex flex-col items-center justify-start max-w-sm md:max-w-xl mx-auto gap-6">
        <div className="flex flex-col gap-3 items-center w-full">
          <h2>
            {selected === 0
              ? "NFT MINT"
              : selected === 1
              ? "NFT SELL LİST"
              : "FINISH"}
          </h2>
          <div className="flex justify-between items-center gap-6 w-full text-xl font-semibold">
            <button
              className={`rounded-full shrink-0 w-12 h-12 bg-white ${
                selected === 0 ? "" : "opacity-50"
              } shadow`}
            >
              1
            </button>
            <div className="border border-dashed border-gray-400 w-full" />
            <button
              className={`rounded-full shrink-0 w-12 h-12 bg-white ${
                selected === 1 ? "" : "opacity-50"
              } shadow`}
            >
              2
            </button>
            <div className="border border-dashed border-gray-400 w-full" />
            <button
              className={`rounded-full shrink-0 w-12 h-12 bg-white ${
                selected === 2 ? "" : "opacity-50"
              } shadow`}
            >
              3
            </button>
          </div>
          {selected === 0 && (
            <Mint
              selected={selected}
              setSelected={setSelected}
              setLoading={setLoading}
            />
          )}
          {selected === 1 && (
            <List
              selected={selected}
              setSelected={setSelected}
              setLoading={setLoading}
            />
          )}
          {selected === 2 && <Finish token_id={0} />}
        </div>
      </div>
    </Layout>
  );
}

function Mint({
  selected,
  setSelected,
  setLoading,
}: {
  selected: number;
  setSelected: Function;
  setLoading: Function;
}) {
  const { wallet, publicKey, connected, connect } = useWallet();
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    checkAddress();
  }, [connected]);
  const [user, setUser] = useState<any>({});
  async function checkAddress() {
    try {
      const res = await pb
        .collection("web3_users")
        .getFirstListItem(`address="${publicKey}"`);
      console.log(res);
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!connected || !publicKey) {
      ToastError.fire("Please connect wallet");
      router.push("/");
      return;
    }
    try {
      setSelected(selected + 1);
      /* setLoading(true);
      const formData = new FormData();
      const files: any = e.currentTarget.elements.namedItem("avatar")?.files;
      console.log(files);

      for (let file of files) {
        formData.append("avatar", file);
      }
      const name = e.currentTarget.elements.namedItem("name")?.value as string;
      const nickname = e.currentTarget.elements.namedItem("nickname")
        ?.value as string;
      const bio = e.currentTarget.elements.namedItem("bio")?.value as string;
      formData.append("name", name);
      formData.append("nickname", nickname);
      formData.append("bio", bio);
      formData.append("address", publicKey);
      console.log(name, nickname, bio);
      const res = await pb.collection("web3_users").create(formData);
      console.log(res);
      ToastSuccess.fire("Success");
      setLoading(false); */
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <form
      key={0}
      onSubmit={handleSubmit}
      className="grid grid-cols-2  w-full gap-6 bg-orange-300 p-12 rounded-2xl "
    >
      <Card disabled={true} img={file ?URL.createObjectURL(file) :''} name={file?.name} creator={user?.nickname} price={100} />
      <div className="flex flex-col items-start col-span-2 justify-center gap-2 w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-fit border-4 border-white border-dashed rounded-lg cursor-pointer bg-gray-50/60  hover:bg-gray-100/80 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 ">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            name="avatar"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
            required
            type="file"
            className="hidden"
          />
        </label>
      </div>
      <div className="col-span-full flex justify-center">
        <button
          type="submit"
          className="bg-[#7EC6D2] text-white font-medium transition-all hover:bg-white hover:text-black p-3 px-6 rounded-md w-1/2"
        >
          Mint
        </button>
      </div>
    </form>
  );
}
function List({
  selected,
  setSelected,
  setLoading,
}: {
  selected: number;
  setSelected: Function;
  setLoading: Function;
}) {
  const { wallet, publicKey, connected, connect } = useWallet();
  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!connected || !publicKey) {
      ToastError.fire("Please connect wallet");
      router.push("/");
      return;
    }
    try {
      setSelected(selected + 1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <form
      key={1}
      onSubmit={handleSubmit}
      className="grid grid-cols-2  w-full gap-6 bg-orange-300 p-12 rounded-2xl "
    >
      <input
        type="number"
        name="name"
        required
        className="h-12 p-3 col-span-2 rounded-lg shadow"
        placeholder="Price"
      />
      <div className="col-span-full flex justify-center">
        <button
          type="submit"
          className="bg-[#7EC6D2] text-white font-medium transition-all hover:bg-white hover:text-black p-3 px-6 rounded-md w-1/2"
        >
          List
        </button>
      </div>
    </form>
  );
}

function Finish({token_id}: {token_id: number}) {
  const [nft, setNft] = useState<any>({});
  useEffect(() => {
    getNft();
  }, []);
  async function getNft() {
    try {
      const res = await pb.collection("nft_sell").getFirstListItem(`token_id=${token_id}`);
      console.log(res);
      setNft(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      key={2}
      className="flex justify-center items-center  w-full gap-6 bg-orange-300 p-12 rounded-2xl "
    >
      <Card img="" name={nft?.name} creator={nft?.creator} price={nft?.price} />
    </div>
  );
}
