"use server";

import Image from "next/image";
import BeerStockList from "@/components/server/beer-stock-list/server";
import BeerInventoryDrawer from "@/components/server/beer-inventory-drawer/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-screen-sm p-4 gap-6 mx-auto">
      <div className="flex gap-12 items-end justify-center">
        <Image src="/hopload.svg" width={70} height={70} alt="Hopload logo" />
        <h1 className="text-3xl">Bottle Stash</h1>
      </div>
      <div className="flex flex-col gap-4">
        <BeerStockList />
        <BeerInventoryDrawer />
      </div>
    </main>
  );
}
