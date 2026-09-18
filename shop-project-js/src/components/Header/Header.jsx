import { useState } from 'react';
import './Header.css'
import { NavLink, Link, useNavigate, useSearchParams } from 'react-router'
export function Header({ cart }) {

    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search")
    const [search, setSearch] = useState(searchText || " ")

    let total = 0;
    cart.forEach(cartItem => {
        total += cartItem.quantity
    });

    const searchInput = (event) => {
        setSearch(event.target.value)
    }
    let navigate = useNavigate();
    const searchButton = () => {
        navigate(`/?search=${search}`)
    }


    const keyButton = (event) => {
        if (event.key === "Enter") {
            navigate(`/?search=${search}`)
        }
    }


    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo" src="/favicon.svg" />
                        <img className="mobile-logo" src="/favicon.svg" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" value={search} onChange={searchInput} onKeyDown={keyButton} />

                    <button className="search-button" onClick={searchButton}>
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{total}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </>
    )
}