import { HomePage } from "./HomePage";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
// import userEvent from "@testing-library/user-event";
import axios from "axios";


vi.mock("axios");

describe("Homepage", () => {
    let appData;
    beforeEach(() => {
        appData = vi.fn()
    })

    axios.get.mockImplementation(async (urlPath) => {
        if (urlPath === `/api/products`) {
            return {
                data: [
                    {
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                            stars: 4,
                            count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    }
                ]
            }
        }
    })

    it("display correctly  in homepage  ", async () => {

        render(
            <MemoryRouter>
                <HomePage cart={[]} appData={appData} />
            </MemoryRouter>
        )

        const productContainer = await screen.findAllByTestId("product-container");
        expect(productContainer.length).toBe(2);

        expect(
            within(productContainer[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument()

        expect(
            within(productContainer[0]).getByTestId("product-image")
        ).toHaveAttribute("src", "images/products/athletic-cotton-socks-6-pairs.jpg")

        expect(
            within(productContainer[0]).getByTestId("product-rating-count")
        ).toBeInTheDocument();

        expect(
            within(productContainer[0]).getByTestId("product-rating-stars")
        ).toHaveAttribute("src", "/images/ratings/rating-45.png")

        expect(
            within(productContainer[0]).getByTestId("product-price")
        ).toBeInTheDocument("$10.90");

        expect(
            within(productContainer[1]).getByText("Intermediate Size Basketball")
        ).toBeInTheDocument();

        expect(
            within(productContainer[1]).getByText(4)
        ).toBeInTheDocument()

        expect(
            within(productContainer[1]).getByTestId("product-image")
        ).toHaveAttribute("src", "images/products/intermediate-composite-basketball.jpg")




    })


})