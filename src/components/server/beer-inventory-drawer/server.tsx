import { getBatches } from "@/lib/brewfather";
import { getStock } from "@/lib/stock";
import ClientBeerInventoryDrawer from "./client/beer-inventory-drawer";

export default async function BeerInventoryDrawer() {
  const beers = await getBatches();
  const stock = await getStock();

  return <ClientBeerInventoryDrawer beers={beers} stock={stock} />;
}
