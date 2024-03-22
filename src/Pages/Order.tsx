import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./Header";
import OrderComponent from "./Components/OrderComponent";

interface RouteParams {
    id: string;
}

const Order = () => {
    const [menu, setMenu] = useState([]);
    const {id} = useParams<RouteParams>();

    useEffect(() => {
        fetch(`http://localhost:3333/menu/${id}`)
            .then(response => response.json())
            .then(json => setMenu(json))
            .catch(console.error);
    }, [id]);

    return (
        <>
            <Header/>
            <OrderComponent menu={menu}/>
        </>
    );
}

export default Order;
