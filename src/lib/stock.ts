"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function getStock() {
  return (await kv.get("beer-stock_stock")) as Record<string, number>;
}

export async function subtractStock(change: Record<string, number>) {
  const stock = await getStock();
  for (const id in change) {
    stock[id] = (stock[id] || 0) - change[id];
  }
  kv.set("beer-stock_stock", stock);
  revalidatePath("/");
}
