import { Productss } from "./Productss";

export function ProductGrid({ products }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Productss key={product.id} product={product} />
                )

            })}

        </div >
    )

};