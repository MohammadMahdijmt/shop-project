import { Productss } from "./Productss";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";


vi.mock("axios");
describe("Productss", () => {

    let product;
    let appData;

    beforeEach(() => {
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }


        appData = vi.fn();
    })

    it("display the products detail correctly", () => {

        render(
            <MemoryRouter>
                <Productss product={product} appData={appData} />
            </MemoryRouter>
        )
        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument()

        expect(
            screen.getByText("$10.90")
        ).toBeInTheDocument()

        expect(
            screen.getByText("87")
        ).toBeInTheDocument()

        expect(
            screen.getByTestId("product-image")
        ).toHaveAttribute("src", "images/products/athletic-cotton-socks-6-pairs.jpg")

        expect(
            screen.getByTestId("product-rating-stars")
        ).toHaveAttribute("src", "/images/ratings/rating-45.png")

    })
    it("display correctly while clicking", async () => {
        render(
            <MemoryRouter>
                <Productss product={product} appData={appData} />
            </MemoryRouter>
        )
        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);
        expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1
        })
        expect(appData).toHaveBeenCalled();

    })


    it("check the quantity of products ", async () => {
        render(
            <MemoryRouter>
                <Productss appData={appData} product={product} />
            </MemoryRouter>
        )
        const quantitySelect = screen.getByTestId("quantity-select")
        const user = userEvent.setup();
        await user.selectOptions(quantitySelect, "3")
        expect(quantitySelect).toHaveValue("3")

    })
})