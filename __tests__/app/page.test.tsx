import {render, screen, within} from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "@/app/page";
import {PokemonItemDTO} from "@/lib/types";


jest.mock("next/image", () => {
    // eslint-disable-next-line
    return function Image({src, alt, ...rest}: any) {
        // Remove `fill` and other non-standard props
        // eslint-disable-next-line
        const {fill, ...imgProps} = rest
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} {...imgProps} />
    }
})

jest.mock("../../src/service/pokemonApi", () => {
    function makePokemon(i: number): PokemonItemDTO {

        return {
            id: i,
            name: `Pokemon-${i}`,
            image: `https://example.com/${i}.png`,
            types: ["typeB", "typeC"],
            heightM: 1,
            weightKg: 13,
        }
    }

    return {
        getFirst20Pokemon: jest.fn().mockImplementation(async () => {
            const list = []
            for (let i = 1; i <= 20; i++) {
                list.push(makePokemon(i))
            }
            return list
        }),
    }
})

describe("Home page (Pokémon List)", () => {
    it("renders heading and 20 Pokémon cards", async () => {
        const element = await Home();
        render(element)

        // Heading
        const heading = screen.getByRole("heading", {name: /pokémon list/i, level: 1})
        expect(heading).toBeInTheDocument()

        // Section containing the grid
        const main = screen.getByRole("main")
        // Expect 20 images (one per PokemonCard)
        const images = within(main).getAllByRole("img")
        expect(images).toHaveLength(20)

        // Spot-check some names and attributes
        expect(screen.getByText("Pokemon-1")).toBeInTheDocument()
        expect(screen.getByText("Pokemon-10")).toBeInTheDocument()
        expect(screen.getByText("Pokemon-20")).toBeInTheDocument()

        expect(images[0]).toHaveAttribute("alt", "Pokemon-1")
        expect(images[0]).toHaveAttribute("src", expect.stringContaining("/1.png"))
    })
})
