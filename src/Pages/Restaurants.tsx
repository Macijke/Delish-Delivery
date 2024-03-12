import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Restaurant from "./Restauration";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3333/restaurations")
            .then(response => response.json())
            .then(json => setRestaurants(json))
            .catch(error => console.log("error", error));
    }, []);

    return (
        <>
            <Header/>
            <Restaurant data={restaurants}/>
            <Footer/>
        </>
    );
}

export default Restaurants;