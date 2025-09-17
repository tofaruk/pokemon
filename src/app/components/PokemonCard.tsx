import {PokemonItemDTO} from "@/app/lib/types";
import Image from "next/image";

type PokemonCardProps = {
    pokemon: PokemonItemDTO;
};
export default function PokemonCard({ pokemon }: PokemonCardProps){
    console.log(pokemon)
    return (
        <div className="overflow-hidden border rounded-2xl">
            <div className="relative aspect-[4/5] w-full">
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill={true}
                />

            </div>
            <div>
                Attribute
            </div>
        </div>
    );
}