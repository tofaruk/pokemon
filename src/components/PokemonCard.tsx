import {PokemonItemDTO} from "@/lib/types";
import Image from "next/image";

type PokemonCardProps = {
    pokemon: PokemonItemDTO;
};
export default function PokemonCard({pokemon}: PokemonCardProps) {
    return (
        <div className="overflow-hidden border rounded-2xl">
            <div className="relative aspect-[4/5] w-full">
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill={true}
                />
                {pokemon.types.length > 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs font-medium text-white">
                            {pokemon.types.join(", ")}
                    </span>
                )}
                <span className="absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-medium">{pokemon.id}</span>
            </div>
            <div className="space-y-2 p-3">
                <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{pokemon.name}</h3>
                <div className="flex justify-between">
                    <span className="text-base font-medium">{pokemon.heightM}m</span>
                    <span className="text-base font-medium">{pokemon.weightKg}kg</span>
                </div>
            </div>
        </div>
    );
}