import { getBatches } from "@/lib/brewfather";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import moment from "moment";
type Batch = Awaited<ReturnType<typeof getBatches>>[number];

type BeerListProps = {
  beers: Batch[];
  stock: Record<string, number>;
};
export function BeerList({ beers, stock }: BeerListProps) {
  return beers
    .filter((x) => stock[x.id] && stock[x.id] > 0)
    .map((beer) => (
      <BeerCard key={beer.id} details={beer} stock={stock[beer.id]} />
    ));
}

type BeerCardProps = {
  details: Batch;
  stock: number;
};
function BeerCard({ details, stock }: BeerCardProps) {
  const digits = String(stock).padStart(2, "0").split("");
  const lagered = moment().diff(moment(details.conditioningDate), "days");

  const BatchNumber = () => (
    <p className={cn("text-sm flex justify-center items-center")}>
      # {details.batchNo}
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
    <div className="flex w-full gap-2 h-14">
      <Left />
      <Right />
    </div>
  );
}
