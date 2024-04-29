import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useRef, useState} from "react";

function mergeCookiesAndCart(cookies: Object, cart: Object) {
    return {...cookies, ...cart};
}

function CartComponent() {
    const [cookies, setCookie] = useCookies();
    const [cart, setCart] = useState([] as any);
    const initialized = useRef(false);
    const userCookie = cookies.user;
    const calculateTotalPrice = () => {
        let total = 0;
        for (let item of cart) {
            total += item.price;
        }
        return total;
    }
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            cookies.cart.map((item: any) => (
                fetch(`http://localhost:3333/menu/${item.restaurant}/${item.food}`)
                    .then(response => response.json())
                    .then(json => {
                        const merged = mergeCookiesAndCart(json[0], item);
                        setCart((prevCart: any) => [...prevCart, merged]);
                    })
                    .catch(console.error)
            ));
        }
    }, [cookies.cart]);


    const handleDelete = (itemToDelete: any) => {
        const updatedCart = cart.filter((item: any) => item !== itemToDelete);
        setCart(updatedCart);
        setCookie('cart', updatedCart, {path: '/'});
    };
    return (
        <article className="container d-flex justify-content-center flex-column align-items-center">
            {cart.length === 0 ? (<div>
                    <h1 className="text-center fw-bold">Koszyk jest pusty</h1>
                </div>) : (<div>
                    <h1 className="text-center fw-bold">Koszyk</h1>
                </div>)}
            <section className="d-flex justify-content-center flex-column w-50">
                {cart.map((item: any, index: number) => (<div key={index} className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`../images/menu/${item.images}`} alt={item.name}
                                     className="img-fluid rounded-start" style={{minWidth: 225}}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title fw-bold">{item.name}</h3>
                                    <h5 className="card-text fw-bold">Cena: {item.price}PLN</h5>
                                    <p className="card-text text-body-tertiary">{item.products.join(', ')}</p>
                                    {item.meat && (<p className="card-text text-body-tertiary">Mięso: {item.meat}</p>)}
                                    {item.sauce && (<p className="card-text text-body-tertiary">Sos: {item.sauce}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-link text-start" onClick={() => handleDelete(item)}>Usuń</button>
                        </div>
                    </div>))}
            </section>
            {cart.length > 0 && (<div>
                    <hr/>
                    <h2 className="text-center">Całkowita cena: {calculateTotalPrice()}PLN</h2>
                    <hr/>
                    {userCookie ? (<Link to="/cart/complete" className="btn btn-primary text-center">Zamów</Link>) : (
                        <Link to="/account" className="btn btn-primary text-center">Zaloguj się</Link>)}
                </div>)}
        </article>

    );
}

export default CartComponent;