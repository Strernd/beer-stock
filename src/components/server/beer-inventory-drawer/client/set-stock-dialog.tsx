"use client";

import { Batch } from "@/lib/brewfather";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setStock } from "@/lib/stock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetStockDialog({
  stock,
  beer,
}: {
  stock: number;
  beer: Batch;
}) {
  const [value, setValue] = useState(stock);
  const setHandler = async () => setStock(beer.id, value);

  return (
    <Dialog>
      <DialogTrigger>
        <p className="cursor-pointer text-start">
          {stock} {beer.name}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Stock</DialogTitle>
          <DialogDescription>
            <h3 className="text-lg mb-2">{beer.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                className=""
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.currentTarget.value))}
              />
              <DialogClose asChild>
                <Button onClick={setHandler}>Set</Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
