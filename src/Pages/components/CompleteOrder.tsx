import {useCookies} from "react-cookie";
import Header from "../Header";
import {Item, Order} from "../OrderModel";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

function mergeCookiesAndCart(cookies: Object, cart: Object) {
    return {...cookies, ...cart};
}

function CompleteOrder() {
    const [ordered, setOrdered] = useState(false);
    const [cookies, setCookies] = useCookies();
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
    const cookieUser = [cookies.user];
    const history = useHistory();

    function handleCompleteOrder(e: any) {
        e.preventDefault();
        let itemsOrder: Item[] = [];
        cart.map((item: any) => {
            let orderItem: Item = {
                restaurantId: item.restaurant,
                foodId: item.food,
                meat: item.meat,
                sauce: item.sauce,
                price: item.price
            }
            itemsOrder.push(orderItem);
        });
        let order: Order = {
            userId: cookieUser[0]._id,
            items: itemsOrder,
            totalPrice: cart.reduce((acc: number, item: any) => acc + item.price, 0)
        }
        fetch('http://localhost:3333/makeOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(response => response.text()).then(json => {
            setOrdered(true);
            setCookies('cart', [], {path: '/'});
            setTimeout(() => {
                history.push('/');
            }, 3500);
        });
    }

    return (
        <>
            <Header/>
            <div><h1 className="text-center font-weight-100 fw-bold">Czy twój koszyk oraz adres się zgadzają?</h1></div>
            <article className="d-flex justify-content-center flex-row align-items-center">
                <section className="d-flex justify-content-center flex-column w-25">
                    {cart.map((item: any, index: number) => (
                        <div key={index} className="d-flex flex-row rounded m-3" style={{minWidth: 125}}>
                            <img className="rounded w-100 me-3" src={`../images/menu/${item.images}`} alt={item.name}
                                 style={{maxWidth: 225}}/>
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

                <section className="d-flex justify-content-center flex-column w-25">
                    {cookieUser.map((item: any, index: number) => (
                        <div key={index} className="d-flex flex-row rounded m-3" style={{minWidth: 125}}>
                            <div className="float-end">
                                <h3 className="fw-bold">Imię: {item.firstName}</h3>
                                <h3 className="fw-bold">Nazwisko: {item.lastName}</h3>
                                <h3 className="fw-bold">Miejscowość: {item.adressCity}</h3>
                                <h3 className="fw-bold">Ulica: {item.adressStreet}</h3>
                                <h3 className="fw-bold">Numer budynku: {item.adressNumber}</h3>
                                {item.adressLocal !== null ?
                                    <h3 className="fw-bold">Numer mieszkania: {item.adressLocal}</h3>
                                    :
                                    ""}
                            </div>
                        </div>
                    ))}
                    <h6>Jeżeli dane nie zgadzają się popraw je w zakładce Konto.</h6>
                </section>
            </article>


            <div className="d-flex justify-content-center mt-4">
                <h3 className="fw-bold ">Cena
                    całkowita: {cart.reduce((acc: number, item: any) => acc + item.price, 0)}PLN</h3>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div>
                    <button className="btn btn-primary me-5" onClick={handleCompleteOrder}>Potwierdź zamówienie</button>
                    <button className="btn btn-secondary me-3" onClick={() => history.push('/cart')}>Wróć do koszyka
                    </button>
                </div>
            </div>
            {ordered && (
                <div className="alert alert-success mt-4" role="alert">
                    Pomyślnie złożono zamówienie!
                </div>
            )}
        </>
    );
}

export default CompleteOrder;