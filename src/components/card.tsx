import Image from "next/image";

export default function Card({
  name,
  img,
  creator,
  price,
  disabled,
}: {
  name: string;
  img: string;
  creator: string;
  price: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col w-full col-span-full max-w-[300px] mx-auto p-4 gap-3 rounded-xl bg-white shadow">
      <Image
        src={img || "/next.svg"}
        className="w-full h-auto object-cover rounded-lg bg-black/80 aspect-square"
        alt="logo"
        width={40}
        height={40}
      />
      <div className="flex flex-col w-full gap-3">
        <div className="flex gap-2 justify-between">
          Name:<h3 className="font-semibold">{name?.slice(0, 20)}</h3>
        </div>
        <div className="flex gap-2 justify-between">
          Creator: <span className="font-bold">{creator}</span>
        </div>
        <div className="flex gap-2 justify-between">
          Price: <span className="font-bold">${price}</span>
        </div>
      </div>
      <button
        type="button"
        disabled={disabled}
        className="bg-[#F38D89] transition-all hover:bg-gray-600 h-10 rounded-lg text-white font-medium"
      >
        BUY
      </button>
    </div>
  );
}
