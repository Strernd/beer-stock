"use client";

import { Batch } from "@/lib/brewfather";
import BeerCard from "./beer-card";
import { useEffect, useState } from "react";
import StockChangeDrawer from "./stock-change-drawer";

type BeerListProps = {
  beers: Batch[];
  initialStock: Record<string, number>;
};
export default function BeerList({ beers, initialStock }: BeerListProps) {
  const [stock, setStock] = useState(initialStock);
  const reset = () => setStock(initialStock);
  useEffect(() => {
    setStock(initialStock);
  }, [initialStock]);

  const decreaseHandler = (id: string) => {
    if (stock[id] === 0) return;
    setStock((stock) => ({ ...stock, [id]: stock[id] - 1 }));
  };

  const beerList = beers
    .filter((x) => initialStock[x.id] && initialStock[x.id] > 0)
    .map((beer) => (
      <BeerCard
        key={beer.id}
        details={beer}
        stock={stock[beer.id]}
        decreaseHandler={() => decreaseHandler(beer.id)}
      />
    ));

  return (
    <div className="flex flex-col gap-4">
      {beerList}
      <StockChangeDrawer
        beers={beers}
        stockDiff={calculateStockDiff(initialStock, stock)}
        reset={reset}
      />
    </div>
  );
}

function calculateStockDiff(
  initialStock: Record<string, number>,
  stock: Record<string, number>
) {
  const diff = {} as Record<string, number>;
  for (const id in stock) {
    const change = (initialStock[id] || 0) - stock[id];
    if (change !== 0) {
      diff[id] = change;
    }
  }
  return diff;
}
