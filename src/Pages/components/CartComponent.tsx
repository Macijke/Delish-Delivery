import {useCart} from "../useCart";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

function CartComponent() {
    const {cart, handleDelete, calculateTotalPrice} = useCart();
    const [cookies, setCookie] = useCookies();
    const userCookie = cookies.user;
    return (
        <article className="d-flex justify-content-center flex-column align-items-center">
            {cart.length === 0 ? <div><h1 className="text-center font-weight-100 fw-bold">Koszyk jest pusty</h1></div> :
                <div><h1 className="text-center font-weight-100 fw-bold">Koszyk</h1></div>}
            <section className="d-flex justify-content-center flex-column w-50">
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
                        <a href="#" className="btn btn-link text-start" onClick={() => handleDelete(item)}>Usuń</a>

                    </div>
                ))}
            </section>
            {cart.length === 0 ? "" : <div>
                <hr/>
                <h2>Całkowita cena: {calculateTotalPrice()}PLN</h2>
                <hr/>
                {userCookie ? <Link to="/cart/complete" className="btn btn-primary text-center">Zamów</Link> : <Link to="/account" className="btn btn-primary text-center">Zaloguj się</Link>}
            </div>}

        </article>
    );
}

export default CartComponent;