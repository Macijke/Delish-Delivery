import {useEffect, useState} from "react";
import RecommendationComponent from "./components/RecommendationComponent";

function Recommendation() {
    const [recommendation, setRecommendation] = useState([]);
    let day = new Date().getDay();

    useEffect(() => {
        fetch(`http://localhost:3333/recommendations/${day}`)
            .then(response => response.json())
            .then(json => setRecommendation(json))
            .catch(console.error);
    }, [day]);

    return (
        <>
            <RecommendationComponent recommendation={recommendation}/>
        </>
    )
}

export default Recommendation;