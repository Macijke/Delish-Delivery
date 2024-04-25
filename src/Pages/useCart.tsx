import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

function mergeCookiesAndCart(cookies: Object, cart: Object) {
    return {...cookies, ...cart};
}

export function useCart() {
    const [cookies, setCookie] = useCookies(['cart']);
    const [cart, setCart] = useState([] as any);

    useEffect(() => {
        cookies.cart.map((item: any) => (
            fetch(`http://localhost:3333/menu/${item.restaurant}/${item.food}`)
                .then(response => response.json())
                .then(json => {
                    const merged = mergeCookiesAndCart(json[0], item);
                    setCart((prevCart: any) => [...prevCart, merged]);
                })
                .catch(console.error)
        ));
    }, [cookies.cart]);

    const handleDelete = (itemToDelete: any) => {
        const updatedCart = cart.filter((item: any) => item !== itemToDelete);
        setCart(updatedCart);
        setCookie('cart', updatedCart, {path: '/'});
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (let item of cart) {
            total += item.price;
        }
        return total;
    }

    return {cart, handleDelete, calculateTotalPrice};
}