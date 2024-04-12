import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";

interface RouteParams {
    restaurantId: string,
    foodId: string
}

function OrderComponent(order: any) {
    const {restaurantId, foodId} = useParams<RouteParams>();
    function handleSubmit(e:any) {
        e.preventDefault();
        const data = new FormData(e.target);
        let datas = {meat: data.get('meat'), sauce: data.get('sauce'), restaurant: restaurantId, food: foodId};
        if (cookies.cart === undefined) {
            setCookies('cart', [datas], {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)});
        } else {
            setCookies('cart', [...cookies.cart, datas], {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)});
        }
    }

    const [cookies, setCookies, removeCookies] = useCookies(['cart']);

    if (order.order.length !== 0) {
        order = order.order[0];

        return (
            <>
                <article className="d-flex justify-content-center flex-wrap">
                    <div className="d-flex flex-column rounded w-25 text-center mb-5">
                        <form onSubmit={handleSubmit}>
                            {order.meat.length !== 0 || order.sauces.length !== 0 ?
                                <h1 className="fw-bold">Dodatki</h1> : ""}
                            <div className="mb-4">
                                {order.meat.length === 0 ? "" :
                                    <h4>Mięso:</h4>
                                }
                                {order.meat.map((item: any) => (
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="meat" id={item} value={item}/>
                                        <label className="form-check-label" htmlFor={item}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                {order.sauces.length === 0 ? "" :
                                    <h4>Sos:</h4>
                                }
                                {order.sauces.map((item: any) => (
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="sauce" id={item}
                                               value={item}/>
                                        <label className="form-check-label" htmlFor={item}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="align-content-end flex-wrap">
                                <button type="submit" className="btn btn-primary">Dodaj do koszyka</button>
                            </div>
                        </form>
                    </div>
                    <div className="d-flex flex-column rounded w-25">
                        <img className="rounded w-100" src={`../../images/menu/${order.images}`} alt={order.name}/>
                        <h3 className="fw-bold">{order.name}</h3>
                        <h5 className="fw-bold">Cena: {order.price}PLN</h5>
                        <div className="text-body-tertiary">
                            {order.products.join(', ')}
                        </div>
                    </div>
                </article>
            </>
        );
    } else {
        return <></>;
    }

}



export default OrderComponent;