import {Link} from "react-router-dom";

function RestaurantComponent(data: any) {
    data = data.data;
    return (
        <article className="container">
            <div className="row justify-content-center">
                {data.map((item:any, index:number) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <Link to={`/menu/${item._id}`} className="text-decoration-none text-dark">
                                <img src={"images/" + item.image} className="card-img-top rounded" alt={item.name}/>
                                <div className="card-body">
                                    <h2 className="card-title fw-bold">{item.name}</h2>
                                    <p className="card-text text-body-tertiary">{item.adress.city},
                                        ul. {item.adress.street}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default RestaurantComponent;