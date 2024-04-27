import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {HistoryOrder} from "./HistoryOrderModel";

function OrderHistory() {
    const [cookies, setCookie] = useCookies();
    const [history, setHistory] = useState<HistoryOrder[]>([]);
    const userCookie = cookies.user;

    useEffect(() => {
        fetch(`http://localhost:3333/orderHistory/${userCookie._id}`)
            .then(response => response.json())
            .then(json => setHistory(json))
            .catch(console.error);
    }, [userCookie]);

    console.log(history)

    return (
        <>
            <div className="container">
                <h1 className="text-center font-weight-100 fw-bold">Historia zamówień</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    {history.map((item: any, index: number) => (
                        <div key={index} className="d-flex flex-column rounded w-25 text-center m-3">
                            <h3 className="fw-bold">Zamówienie {index + 1}</h3>
                            <h5 className="fw-bold">Data: {item.date}</h5>
                            <h5 className="fw-bold">Cena: {item.totalPrice}PLN</h5>
                            {item.items.map((item: any, index: number) => (
                                <div key={index} className="d-flex flex-row rounded m-3" style={{minWidth: 125}}>
                                    <div className="float-end">
                                        <h3 className="fw-bold">{item.name}</h3>
                                        <h5 className="fw-bold">Cena: {item.price}PLN</h5>
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default OrderHistory;