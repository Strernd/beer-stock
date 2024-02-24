import { getBatch, getBatches } from "@/lib/brewfather";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";

type Batch = Awaited<ReturnType<typeof getBatches>>[number];
export default async function Home() {
  const beers = await getBatches();
  console.log(beers);
  const beerList = beers.map((beer) => (
    <BeerCard key={beer.id} details={beer} />
  ));
  return (
    <main className="flex min-h-screen flex-col max-w-screen-sm p-4 gap-6">
      <div className="flex gap-6 items-center">
        <Image src="/hopload.svg" width={70} height={70} alt="Hopload logo" />
        <h1 className="text-3xl">Beer Stock</h1>
      </div>
      <div className="flex flex-col gap-6">{beerList}</div>
    </main>
  );
}

type BeerCardProps = {
  details: Batch;
};
function BeerCard(props: BeerCardProps) {
  const stock = String(Math.round(Math.random() * 20));
  const digits = stock.padStart(2, "0").split("");
  const lagered = moment().diff(moment(props.details.conditioningDate), "days");

  const BatchNumber = () => (
    <p
      className={cn(
        "rounded-lg px-2 text-sm flex justify-center items-center",
        props.details.colorEbc > 25 && "text-white"
      )}
      style={{ backgroundColor: props.details.colorRgb }}
    >
      {props.details.batchNo}
    </p>
  );

  const StockCount = () => (
    <div className={cn("flex gap-1 text-white h-full", GeistMono.className)}>
      <p className="bg-slate-800 w-10 h-full flex items-center justify-center rounded-lg shadow">
        <span className="text-3xl">{digits[0]}</span>
      </p>
      <p className="bg-slate-800 w-10 h-full flex items-center justify-center  rounded-lg shadow">
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
      <p className="inline-block font-semibold">{props.details.name}</p>
    </div>
  );

  const LeftBottomRow = () => (
    <div className="text-xs flex justify-between">
      <p>
        {props.details.abv}% - {props.details.ibu} IBU{" "}
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
