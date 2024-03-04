import { Batch } from "@/lib/brewfather";
import moment from "moment";
import TwoDigitCounter from "./two-digit-counter";

type BeerCardProps = {
  details: Batch;
  stock: number;
  decreaseHandler: () => void;
};

export default function BeerCard({
  details,
  stock,
  decreaseHandler,
}: BeerCardProps) {
  const digits = String(stock).padStart(2, "0");
  const lagered = moment().diff(moment(details.conditioningDate), "days");

  return (
    <div
      className="flex w-full gap-2 h-16 bg-slate-10 cursor-pointer"
      onClick={() => decreaseHandler()}
    >
      <div className="flex gap-2 w-full flex-col justify-between p-2 rounded-lg shadow-lg">
        <div className="flex gap-4 w-full">
          <p className="text-sm flex justify-center items-center">
            #{details.batchNo}
          </p>
          <p className="inline-block font-semibold">{details.name}</p>
        </div>
        <div className="text-xs flex gap-2">
          <p>
            {details.abv}% - {details.ibu} IBU{" "}
          </p>
          <p className="text-green-700">lagered for {lagered} days</p>
        </div>
      </div>
      <div className="align-self-end">
        <TwoDigitCounter digits={digits} rgbColor={details.colorRgb} />
      </div>
    </div>
  );
}
