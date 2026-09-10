import './HomePage.css';
import axios from 'axios';
import { Header } from '../Header/Header';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, appData }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const textSearch = searchParams.get("search");

    useEffect(() => {
        const fetchHomeData = async () => {
            const urlPath = textSearch ? `/api/products?search=${textSearch}` : `/api/products`;
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };

        fetchHomeData();

    }, [textSearch]);

    return (
        <>
            <title>shop-project</title>

            <Header cart={cart} />

            <div className="home-page">

                <ProductGrid products={products} appData={appData} />

            </div>
        </>
    )
}