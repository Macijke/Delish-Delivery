import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import React, {useState} from "react";

interface RouteParams {
    restaurantId: string,
    foodId: string
}

function OrderComponent(order: any) {
    const {restaurantId, foodId} = useParams<RouteParams>();
    const [cookies, setCookies] = useCookies(['cart']);
    const [itemAdded, setItemAdded] = useState(false);
    function handleSubmit(e:any) {
        e.preventDefault();
        setItemAdded(true);
        const data = new FormData(e.target);
        let datas = {meat: data.get('meat'), sauce: data.get('sauce'), restaurant: restaurantId, food: foodId};
        if (cookies.cart === undefined) {
            setCookies('cart', [datas], {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)});
        } else {
            setCookies('cart', [...cookies.cart, datas], {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)});
        }
    }


    if (order.order.length !== 0) {
        order = order.order[0];

        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 mb-5">
                            <form onSubmit={handleSubmit} className="card p-4">
                                {order.meat.length !== 0 || order.sauces.length !== 0 && (
                                    <h2 className="text-center fw-bold mb-4">Dodatki</h2>
                                )}
                                <div className="mb-4">
                                    {order.meat.length !== 0 && (
                                        <>
                                            <h4 className="mb-3">Mięso:</h4>
                                            {order.meat.map((item: any) => (
                                                <div key={item} className="form-check">
                                                    <input className="form-check-input" type="radio" name="meat" id={item} value={item}/>
                                                    <label className="form-check-label" htmlFor={item}>
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {order.sauces.length !== 0 && (
                                        <>
                                            <h4 className="mb-3">Sos:</h4>
                                            {order.sauces.map((item: any) => (
                                                <div key={item} className="form-check">
                                                    <input className="form-check-input" type="radio" name="sauce" id={item} value={item}/>
                                                    <label className="form-check-label" htmlFor={item}>
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Dodaj do koszyka</button>
                                    {itemAdded && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            Dodano do koszyka!
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 mb-5">
                            <div className="card">
                                <img src={`../../images/menu/${order.images}`} className="card-img-top rounded" alt={order.name}/>
                                <div className="card-body">
                                    <h3 className="card-title fw-bold">{order.name}</h3>
                                    <h5 className="card-text fw-bold">Cena: {order.price}PLN</h5>
                                    <p className="card-text text-body-tertiary">{order.products.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    } else {
        return <></>;
    }

}



export default OrderComponent;