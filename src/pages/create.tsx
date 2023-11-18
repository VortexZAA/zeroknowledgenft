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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { wallet, publicKey, connected, connect } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!connected || !publicKey) {
      ToastError.fire("Please connect wallet");
      router.push("/");
      return;
    }
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Layout title="SignUp Creator">
      {loading && <Loader />}
      <div className="w-full flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 max-w-sm gap-4 -mt-11"
        >
          <input
            type="text"
            name="name"
            required
            className="h-12 p-3 rounded-lg shadow"
            placeholder="Enter Creator Name"
          />
          <input
            type="text"
            name="nickname"
            required
            className="h-12 p-3 rounded-lg shadow"
            placeholder="Enter Nick Name"
          />
          <textarea
            name="bio"
            rows={4}
            required
            minLength={10}
            className=" p-3 rounded-lg shadow col-span-2"
            placeholder="Enter Bio"
          />

          <div className="flex flex-col items-start col-span-2 justify-center gap-2 w-full">
            Avatar:
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                name="avatar"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#7EC6D2] text-white font-medium transition-all hover:bg-white hover:text-black p-3 px-6 rounded-md w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
