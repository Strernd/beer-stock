import { getBatches } from "@/lib/brewfather";
import { getStock } from "@/lib/stock";
import ClientBeerStockList from "./client/beer-stock-list";

export default async function BeerStockList() {
  const beers = await getBatches();
  const stock = await getStock();

  return <ClientBeerStockList beers={beers} initialStock={stock} />;
}
