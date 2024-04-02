import {Link} from "react-router-dom";

function RecommendationComponent(recommendation: any) {
    recommendation = recommendation.recommendation[0];
    return (
        <>
            {recommendation === undefined ? "" :
            <article className="d-flex justify-content-center flex-wrap">
                <Link to={`/menu/${recommendation._id}`} className="text-decoration-none text-black">
                <div className="d-flex flex-column rounded text-center mb-5">
                    <img className="rounded w-100" src={`../images/promotion/${recommendation.image}`} alt={recommendation.name}/>
                    <h3 className="fw-bold">{recommendation.slogan}</h3>
                </div>
                </Link>
            </article>
            }
        </>
    );
}

export default RecommendationComponent;