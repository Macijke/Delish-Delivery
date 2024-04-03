import {Link} from "react-router-dom";

function MenuComponent(menu: any) {
    menu = menu.menu;
    return (
        <article className="d-flex justify-content-center">
            <div className="d-flex justify-content-evenly flex-wrap w-75 row-gap-5 column-gap-4">
                {menu.map((item: any) => (
                <div
                    className="d-flex flex-column rounded w-25" style={{maxWidth: 225, minWidth: 125}}>
                    <Link to={`/order/${item._id}/${item.restaurant_id}`} className="text-decoration-none text-black">
                        <img className="rounded w-100" src={`../images/menu/${item.images}`} alt={item.name}/>
                        <h3 className="fw-bold">{item.name}</h3>
                        <h5 className="fw-bold">Cena: {item.price}PLN</h5>
                        <div className="text-body-tertiary">
                            {item.products.join(', ')}
                        </div>
                    </Link>
                </div>
                ))}
            </div>
        </article>
    );
}

export default MenuComponent;