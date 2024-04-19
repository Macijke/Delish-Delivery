import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

function mergeCookiesAndCart(cookies: Object, cart: Object) {
    return {...cookies, ...cart};
}

function CartComponent() {


    const [cookies] = useCookies(['cart']);
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
    }, [cookies]);

    console.log(cart);
    return (
        <article className="d-flex justify-content-center flex-column align-items-center">
            <div><h1 className="text-center font-weight-100 fw-bold">Koszyk</h1></div>
            <section className="d-flex justify-content-center flex-column w-50">
                {cart.map((item: any, index: number) => (
                    <div key={index} className="d-flex flex-row rounded m-3" style={{minWidth: 125}}>
                        <img className="rounded w-100 me-3" src={`../images/menu/${item.images}`} alt={item.name} style={{maxWidth: 225}}/>
                        <div className="float-end">
                            <h3 className="fw-bold">{item.name}</h3>
                            <h5 className="fw-bold">Cena: {item.price}PLN</h5>
                            <div className="text-body-tertiary">
                                {item.products.join(', ')}
                            </div>
                            {item.meat === null ? "" :
                                <div className="text-body-tertiary">
                                    Mięso: {item.meat}
                                </div>
                            }
                            {item.sauce === null ? "" :
                                <div className="text-body-tertiary">
                                    Sos: {item.sauce}
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </section>
        </article>
    );
}

export default CartComponent;