import {
    PokemonItem,
    PokemonItemDTO,
    PokemonListItem,
    PokemonListResponse
} from "@/app/lib/types";

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
        list.results.map(async (item: PokemonListItem, index: number): Promise<PokemonItemDTO | null> => {
            try {
                const pokemonItemData: PokemonItem = await fetchJson<PokemonItem>(item.url)

                return {
                    id: pokemonItemData.id,
                    name: pokemonItemData.name ?? '',
                    image: pokemonItemData.sprites.other?.home?.front_default ?? '', // TODO refactor
                    types: pokemonItemData.types?.map((t) => t?.type?.name) ?? [],
                    heightM: pokemonItemData.height, // TODO convert the value to meter
                    weightKg: pokemonItemData.weight, // TODO convert the value to weight
                }
            } catch {
                //  failure: skip this one
                    // TODO error log
                return null
            }
        })
    )

    // TODO sort by ID
    return pokemonItemDTOList
        .filter((x: PokemonItemDTO | null): x is PokemonItemDTO => !!x)
}