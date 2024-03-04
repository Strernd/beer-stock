"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Batch } from "@/lib/brewfather";
import SetStockDialog from "./set-stock-dialog";

export default function BeerInventoryDrawer({
  beers,
  stock,
}: {
  beers: Batch[];
  stock: Record<string, number>;
}) {
  const beerList = beers.map((beer) => (
    <SetStockDialog key={beer.id} stock={stock[beer.id]} beer={beer} />
  ));

  return (
    <Drawer>
      <div className="w-full flex justify-end">
        <DrawerTrigger className="w-full" asChild>
          <Button className="w-full text-lg py-6">Set Inventory</Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Inventory</DrawerTitle>
        </DrawerHeader>
        <div className="py-2 px-6 flex flex-col gap-2">{beerList}</div>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
