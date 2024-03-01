"use client";

import { getBatches } from "@/lib/brewfather";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { subtractStock } from "@/lib/stock";
type Batch = Awaited<ReturnType<typeof getBatches>>[number];

type BeerListProps = {
  beers: Batch[];
  initialStock: Record<string, number>;
};
export function BeerList({ beers, initialStock }: BeerListProps) {
  const [stock, setStock] = useState(initialStock);
  const reset = () => setStock(initialStock);
  const decreaseHandler = (id: string) => {
    if (stock[id] === 0) return;
    setStock((stock) => ({ ...stock, [id]: stock[id] - 1 }));
    console.log("decreaseHandler", id);
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
      <div className="flex flex-col gap-6">{beerList}</div>
      <StockChanges
        beers={beers}
        stockDiff={calculateStockDiff(initialStock, stock)}
        reset={reset}
      />
    </div>
  );
}

type BeerCardProps = {
  details: Batch;
  stock: number;
  decreaseHandler: () => void;
};
function BeerCard({ details, stock, decreaseHandler }: BeerCardProps) {
  const digits = String(stock).padStart(2, "0").split("");
  const lagered = moment().diff(moment(details.conditioningDate), "days");

  const BatchNumber = () => (
    <p className={cn("text-sm flex justify-center items-center")}>
      #{details.batchNo}
    </p>
  );

  const StockCount = () => (
    <div className={cn("flex gap-1 h-full", GeistMono.className)}>
      <p
        className={cn(
          "w-10 h-full flex items-center justify-center rounded-lg shadow",
          details.colorEbc > 5 && "text-white"
        )}
        style={{ backgroundColor: details.colorRgb }}
      >
        <span className="text-3xl">{digits[0]}</span>
      </p>
      <p
        className={cn(
          "w-10 h-full flex items-center justify-center rounded-lg shadow",
          details.colorEbc > 5 && "text-white"
        )}
        style={{ backgroundColor: details.colorRgb }}
      >
        <span className="text-3xl">{digits[1]}</span>
      </p>
    </div>
  );

  const Right = () => (
    <div className="align-self-end">
      <StockCount />
    </div>
  );

  const LeftTopRow = () => (
    <div className="flex gap-4 w-full">
      <BatchNumber />
      <p className="inline-block font-semibold">{details.name}</p>
    </div>
  );

  const LeftBottomRow = () => (
    <div className="text-xs flex justify-between">
      <p>
        {details.abv}% - {details.ibu} IBU{" "}
      </p>
      <p className="text-green-700">{lagered} days lagered</p>
    </div>
  );

  const Left = () => (
    <div className="flex gap-2 w-full flex-col justify-between p-1 rounded shadow">
      <LeftTopRow />
      <LeftBottomRow />
    </div>
  );

  return (
    <div
      className="flex w-full gap-2 h-14 cursor-pointer"
      onClick={() => decreaseHandler()}
    >
      <Left />
      <Right />
    </div>
  );
}

type StockChangesProps = {
  beers: Batch[];
  stockDiff: Record<string, number>;
  reset: () => void;
};
function StockChanges({ beers, stockDiff, reset }: StockChangesProps) {
  const changedBeers = beers.filter((x) => stockDiff[x.id]);
  const sumChanges = Object.values(stockDiff).reduce((a, b) => a + b, 0);
  const changes = changedBeers.map((beer) => (
    <StockChange key={beer.id} beer={beer} change={stockDiff[beer.id]} />
  ));

  const commitHandler = async () => {
    await subtractStock(stockDiff);
  };

  return sumChanges > 0 ? (
    <Drawer>
      <div className="w-full flex justify-end">
        <DrawerTrigger className="w-full">
          <Button className="w-full text-lg py-6">
            Stock changes ({sumChanges})
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Stock changes</DrawerTitle>
        </DrawerHeader>
        <div className="py-2 px-6">{changes}</div>
        <DrawerFooter>
          <DrawerClose>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline" onClick={reset}>
                Clear
              </Button>
              <Button onClick={commitHandler}>Commit</Button>
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <> </>
  );
}

function StockChange({ beer, change }: { beer: Batch; change: number }) {
  return (
    <div className="flex justify-between">
      <p>{beer.name}</p>
      <p>-{change}</p>
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
