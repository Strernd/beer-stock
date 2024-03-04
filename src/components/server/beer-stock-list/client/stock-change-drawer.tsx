import { getBatches } from "@/lib/brewfather";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { subtractStock } from "@/lib/stock";

type Batch = Awaited<ReturnType<typeof getBatches>>[number];

type StockChangeDrawerProps = {
  beers: Batch[];
  stockDiff: Record<string, number>;
  reset: () => void;
};
export default function StockChangeDrawer({
  beers,
  stockDiff,
  reset,
}: StockChangeDrawerProps) {
  const changedBeers = beers.filter((x) => stockDiff[x.id]);
  const sumChanges = Object.values(stockDiff).reduce((a, b) => a + b, 0);

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
        <div className="py-2 px-6">
          {changedBeers.map((beer) => (
            <div key={beer.id} className="flex justify-between">
              <p>{beer.name}</p>
              <p>-{stockDiff[beer.id]}</p>
            </div>
          ))}
        </div>
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
