import {
    PokemonItem,
    PokemonItemDTO,
    PokemonListItem,
    PokemonListResponse
} from "@/lib/types";
import {capitalize, pickPokemonImage, toKg, toMeters} from "@/lib/helper";

const BASE = 'https://pokeapi.co/api/v2'
const LIMIT = 20

// 24h ISR cache (Next.js fetch option)
const revalidateDay = {next: {revalidate: 60 * 60 * 24}} as const

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, revalidateDay)
    if (!res.ok) throw new Error(`Failed fetch ${url}: ${res.status}`)
    return (await res.json()) as T
}


export async function getFirst20Pokemon(): Promise<PokemonItemDTO[]> {

    const list: PokemonListResponse = await fetchJson<PokemonListResponse>(
        `${BASE}/pokemon?limit=${LIMIT}&offset=0`
    )

    const pokemonItemDTOList: (PokemonItemDTO | null)[] = await Promise.all(
        list.results.map(async (item: PokemonListItem): Promise<PokemonItemDTO | null> => {
            try {
                const pokemonItemData: PokemonItem = await fetchJson<PokemonItem>(item.url)

                return {
                    id: pokemonItemData.id,
                    name: capitalize(pokemonItemData.name),
                    image: pickPokemonImage(pokemonItemData),
                    types: pokemonItemData.types?.map((t) => capitalize(t?.type?.name)) ?? [],
                    heightM: toMeters(pokemonItemData.height),
                    weightKg: toKg(pokemonItemData.weight),
                }
            } catch(err : unknown) {
                // graceful partial failure: skip this one
                const message = err instanceof Error ? err.message : String(err);
                console.error(
                    `[getFirst20Pokemon] Failed to fetch details: ${message}`,
                    err
                );
                return null
            }
        })
    )

    // sort by id in case items are not already sorted in the api response
    return pokemonItemDTOList
        .filter((x: PokemonItemDTO | null): x is PokemonItemDTO => !!x)
        .sort((a:PokemonItemDTO, b:PokemonItemDTO) => a.id - b.id)
}