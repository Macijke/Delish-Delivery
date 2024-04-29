import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import OrderComponent from "./components/OrderComponent";
import Header from "./Header";

interface RouteParams {
    restaurantId: string,
    foodId: string
}

function Order() {
    const [order, setOrder] = useState([]);
    const {restaurantId, foodId} = useParams<RouteParams>();

    useEffect(() => {
        fetch(`http://localhost:3333/menu/${restaurantId}/${foodId}`)
            .then(response => response.json())
            .then(json => setOrder(json))
            .catch(console.error);
    }, [restaurantId, foodId]);

    return (
        <>
            <Header/>
            <OrderComponent order={order}/>
        </>
    );
}

export default Order;