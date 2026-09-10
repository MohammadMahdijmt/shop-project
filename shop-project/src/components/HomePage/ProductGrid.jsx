import { Productss } from "./Productss";

export function ProductGrid({ products, appData }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Productss key={product.id} product={product} appData={appData} />
                )

            })}

        </div >
    )

};