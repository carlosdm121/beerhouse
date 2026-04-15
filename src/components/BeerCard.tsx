import Image from "next/image";
import { Beer } from "@/types";

interface BeerCardProps {
  beer: Beer;
}

export function BeerCard({ beer }: BeerCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={beer.imageUrl}
        width={400}
        height={300}
        alt={`${beer.name} - ${beer.brand}`}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="font-semibold text-beer-900 mb-2">
          {beer.name}
        </h3>
        <p className="text-beer-600 text-sm mb-2">
          {beer.brand} • {beer.type}
        </p>
        <p className="text-beer-700 line-clamp-2 mb-3">
          {beer.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-beer-500">
            ${beer.price.toFixed(2)} ARS
          </span>
          <span className="text-beer-600">
            {beer.alcoholContent}% ABV
          </span>
        </div>
      </div>
    </div>
  );
}