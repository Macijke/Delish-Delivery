import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./Header";
import MenuComponent from "./components/MenuComponent";

interface RouteParams {
    id: string;
}

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const {id} = useParams<RouteParams>();
    console.log(menu)
    useEffect(() => {
        fetch(`http://localhost:3333/menu/${id}`)
            .then(response => response.json())
            .then(json => setMenu(json))
            .catch(console.error);
    }, [id]);

    return (
        <>
            <Header/>
            <MenuComponent menu={menu} restaurant={id}/>
        </>
    );
}

export default Menu;
