import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

function CartComponent() {
    const [cookies] = useCookies(['cart']);
    const [cart, setCart] = useState([] as any);
    useEffect(() => {
        cookies.cart.map((item: any) => {
            fetch(`http://localhost:3333/menu/${item.restaurant}/${item.food}`)
                .then(response => response.json())
                .then(json => setCart((prevCart: any) => [...prevCart, json] as any))
                .catch(console.error);
        });
    }, [cookies]);
    console.log(cart);
    return (
        <article className="d-flex justify-content-center">
            <h1 className="text-center font-weight-100 fw-bold">Koszyk</h1>
            <section className="d-flex justify-content-center flex-wrap">
                {cart.map((item: any, index: number) => (
                    <div key={index}>
                        {/* Display item details here */}
                    </div>
                ))}
            </section>
        </article>
    );
}

export default CartComponent;