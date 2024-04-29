import {Link} from "react-router-dom";

function MenuComponent(menu: any) {
    menu = menu.menu;
    return (
        <article className="container">
            <div className="row justify-content-center">
                {menu.map((item: any, index: number) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <Link to={`/order/${item._id}/${item.restaurant_id}`}
                                  className="text-decoration-none text-dark">
                                <img src={`../images/menu/${item.images}`} className="card-img-top rounded"
                                     alt={item.name}/>
                                <div className="card-body">
                                    <h3 className="card-title fw-bold">{item.name}</h3>
                                    <h5 className="card-text fw-bold">Cena: {item.price}PLN</h5>
                                    <div className="card-text text-body-tertiary">
                                        {item.products.join(', ')}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}

export default MenuComponent;