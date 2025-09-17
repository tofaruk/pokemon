import {PokemonItemDTO} from "@/app/lib/types";
import {getFirst20Pokemon} from "@/app/service/pokemonApi";
import PokemonCard from "@/app/components/PokemonCard";

export default async function Home() {
    const pokemonList: PokemonItemDTO[] = await getFirst20Pokemon();
    return (
        <main className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Pokémon List</h1>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pokemonList.map((p:PokemonItemDTO)=>(
                    <PokemonCard key={p.id} pokemon={p}/>
                ))}
            </section>
        </main>
    );
}
