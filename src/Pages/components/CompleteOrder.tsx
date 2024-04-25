import {useCookies} from "react-cookie";
import {useCart} from "../useCart";
import Header from "../Header";
import {Item, Order} from "../OrderModel";

function CompleteOrder() {
    const [cookies, setCookies] = useCookies();
    const {cart} = useCart();
    const cookieUser = [cookies.user];

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
            items: itemsOrder
        }
        console.log(order);
        fetch('http://localhost:3333/makeOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        setCookies('cart', [], {path: '/'});
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
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={handleCompleteOrder}>Potwierdź zamówienie</button>
            </div>
        </>
    );
}

export default CompleteOrder;