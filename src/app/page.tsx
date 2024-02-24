import { getBatches } from "@/lib/brewfather";
import Image from "next/image";
import { BeerList } from "@/components/beerlist";
import { kv } from "@vercel/kv";

export default async function Home() {
  const beers = await getBatches();
  const stock = (await kv.get("beer-stock_stock")) as Record<string, number>;
  return (
    <main className="flex min-h-screen flex-col max-w-screen-sm p-4 gap-6">
      <div className="flex gap-6 items-center">
        <Image src="/hopload.svg" width={70} height={70} alt="Hopload logo" />
        <h1 className="text-3xl">Beer Stock</h1>
      </div>
      <div className="flex flex-col gap-6">
        <BeerList beers={beers} stock={stock} />
      </div>
    </main>
  );
}
