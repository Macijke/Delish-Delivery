import {Link} from "react-router-dom";

function Restaurant(data: any) {
    data = data.data;
    return (
        <article className="d-flex justify-content-center">
            <div className="d-flex justify-content-evenly flex-wrap w-75">
            {
                data.map((item: any) => {
                    return (
                        <div className="d-flex align-items-start flex-column m-sm-auto">
                            <Link to={"/order/" + item._id} className="text-decoration-none text-black">
                            <img className="rounded" src={"images/" + item.image} alt={item.name}/>
                            <h2 className="fw-bold">{item.name}</h2>
                            <p className="text-body-tertiary">{item.adress.city + ", ul. " + item.adress.street}</p>
                            </Link>
                        </div>
                        );
                })
            }
            </div>
        </article>
    )
}

export default Restaurant;