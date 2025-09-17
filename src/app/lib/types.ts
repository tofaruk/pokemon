import {StaticImageData} from "next/image";

type SpriteSource = {
    front_default?: string | null
};

export type PokemonItemDTO = {
    id: number
    name: string
    image: string | StaticImageData
    types: string[]
    heightM: number
    weightKg: number
}

export type PokemonItem = {
    id: number
    name: string
    height: number // decimeters
    weight: number // hectograms
    types: { type: { name: string } }[]
    sprites: {
        other?: {
            home?: SpriteSource;
            dream_world?: SpriteSource;
        };
    };
}


export type PokemonListItem = {
    name: string;
    url: string
}

export type PokemonListResponse = {
    count: number
    results: PokemonListItem[]
}