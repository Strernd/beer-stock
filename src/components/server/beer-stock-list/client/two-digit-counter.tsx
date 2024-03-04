import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";

export default function TwoDigitCounter({
  rgbColor,
  digits,
}: {
  rgbColor: string;
  digits: string;
}) {
  return (
    <div className={cn("flex gap-1 h-full", GeistMono.className)}>
      <p
        className="w-10 h-full flex items-center justify-center rounded-lg shadow text-white"
        style={{ backgroundColor: rgbColor }}
      >
        <span className="text-4xl">{digits[0]}</span>
      </p>
      <p
        className="w-10 h-full flex items-center justify-center rounded-lg shadow text-white"
        style={{ backgroundColor: rgbColor }}
      >
        <span className="text-4xl">{digits[1]}</span>
      </p>
    </div>
  );
}
