import {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import RestaurantComponent from "./Components/RestaurantComponent";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3333/restaurants")
            .then(response => response.json())
            .then(json => setRestaurants(json))
            .catch(error => console.log("error", error));
    }, []);

    return (
        <>
            <Header/>
            <RestaurantComponent data={restaurants}/>
            <Footer/>
        </>
    );
}

export default Restaurants;