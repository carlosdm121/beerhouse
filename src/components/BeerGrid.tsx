import { BeerCard } from "./BeerCard";
import { BEERS } from "@/constants/beers";

export function BeerGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {BEERS.map((beer) => (
        <BeerCard key={beer.id} beer={beer} />
      ))}
    </div>
  );
}