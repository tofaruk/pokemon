import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import {PokemonItemDTO} from "@/lib/types";
import PokemonCard from "@/components/PokemonCard";


jest.mock("next/image", () => {
    // eslint-disable-next-line
    return function Image({ src, alt, ...rest }: any) {
        // Remove `fill` and other non-standard props
        // eslint-disable-next-line
        const { fill, ...imgProps } = rest
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} {...imgProps} />
    }
})
describe("PokemonCard", () => {
    const mockPokemon: PokemonItemDTO = {
        id: 2,
        name: "ivysaur",
        image: "https://example.com/2.png",
        types: ["grass","poison"],
        heightM: 0.4,
        weightKg: 6,
    }

    it("renders pokemon name, id, image, types, height and weight", () => {
        render(<PokemonCard pokemon={mockPokemon} />)

        // Image
        const img = screen.getByRole("img", { name: /Ivysaur/i })
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", expect.stringContaining("2.png"))

        // Name
        expect(screen.getByText("ivysaur")).toBeInTheDocument()

        // ID
        expect(screen.getByText("2")).toBeInTheDocument()

        // Types
        expect(screen.getByText(/grass/i)).toBeInTheDocument()

        // Height and weight
        expect(screen.getByText("0.4m")).toBeInTheDocument()
        expect(screen.getByText("6kg")).toBeInTheDocument()
    })

    it("does not render types badge if no types provided", () => {
        const noTypePokemon = { ...mockPokemon, types: [] }
        render(<PokemonCard pokemon={noTypePokemon} />)

        expect(screen.queryByText(/electric/i)).not.toBeInTheDocument()
    })
})
