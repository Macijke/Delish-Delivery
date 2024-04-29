import {Link} from "react-router-dom";

function RecommendationComponent(recommendation: any) {
    recommendation = recommendation.recommendation[0];
    return (
        <>
            {recommendation && (
                <section className="container-fluid bg-light py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card">
                                    <Link to={`/menu/${recommendation.restaurantID}`} className="text-decoration-none text-dark">
                                        <img className="card-img-top rounded" src={`../images/promotion/${recommendation.image}`} alt={recommendation.name}/>
                                        <div className="card-body">
                                            <h3 className="card-title text-center fw-bold">{recommendation.slogan}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default RecommendationComponent;