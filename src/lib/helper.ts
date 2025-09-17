import {PokemonItem} from "@/lib/types";
import FALLBACK from "@/../public/img/pokemon-fallback.png";

/** Round to 1 decimal place. */
function round1(value: number): number {
    const scaled: number = value * 10;
    const rounded: number = Math.round(scaled);
    return rounded / 10;
}

/** Convert hectograms to kilograms (1 hg = 0.1 kg). */
export function toKg(hectograms: number): number {
    const kilograms: number = hectograms / 10;
    return round1(kilograms);
}

/** Convert decimeters to meters (1 dm = 0.1 m). */
export function toMeters(decimeters: number): number {
    const meters:number = decimeters / 10;
    return round1(meters);
}

/** Capitalize the first letter and lowercase the rest. */
export function capitalize(text: string): string {
    if (!text) {
        return "";
    }
    const first: string = text.charAt(0).toUpperCase();
    const rest: string = text.slice(1).toLowerCase();
    return first + rest;
}

/** Pick home or dream world or fallback image. */
export function pickPokemonImage(p: PokemonItem): string {
    const s = p.sprites
    return (
        s?.other?.home?.front_default ||
        s?.other?.dream_world?.front_default ||
        FALLBACK.src
    )
}