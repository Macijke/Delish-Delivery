import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {HistoryOrder} from "./HistoryOrderModel";
import {Link, useParams} from "react-router-dom";

interface RouteParams {
    orderId: string
}

function OrderHistory() {
    const [cookies, setCookie] = useCookies();
    const [history, setHistory] = useState<HistoryOrder[]>([]);
    const {orderId} = useParams<RouteParams>();

    const userCookie = cookies.user;

    useEffect(() => {
        const getHistory = async () => {
            fetch(`http://localhost:3333/orderHistory/${userCookie._id}`)
                .then(response => response.json())
                .then(json => setHistory(json))
                .catch(console.error);
        }
        getHistory();
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="text-center fw-bold">Historia zamówień</h1>
                <div className="row justify-content-center">
                    {history.map((item, index) => (
                        <div key={index} className="col-lg-6 col-md-8 col-sm-10 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title fw-bold">
                                        <Link to={"/account/order/history/" + item._id} className="text-decoration-none">Zamówienie {index + 1}</Link>
                                    </h3>
                                    <h5 className="card-text fw-bold">Status: {item.status}</h5>
                                    <h5 className="card-text fw-bold">Data: {item.date}</h5>
                                    <h5 className="card-text fw-bold">Cena: {item.totalPrice}PLN</h5>
                                    {orderId !== undefined && orderId === item._id && (
                                        <div>
                                            {item.items.map((item, index) => (
                                                <div key={index} className="card mb-3">
                                                    <div className="row g-0">
                                                        <div className="col-md-4">
                                                            <img src={`../../../images/menu/${item.images}`} alt={item.name} className="img-fluid rounded-start" style={{ maxWidth: "180px" }} />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h3 className="card-title fw-bold">{item.name}</h3>
                                                                <h5 className="card-text fw-bold">Cena: {item.price}PLN</h5>
                                                                {item.meat && (
                                                                    <p className="card-text text-body-tertiary">Mięso: {item.meat}</p>
                                                                )}
                                                                {item.sauce && (
                                                                    <p className="card-text text-body-tertiary">Sos: {item.sauce}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default OrderHistory;