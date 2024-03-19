import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./Header";

interface RouteParams {
    id: string;
}

const Order = () => {
    const [menu, setMenu] = useState([]);
    const { id } = useParams<RouteParams>();

    useEffect(() => {
        fetch(`http://localhost:3333/menu/${id}`)
            .then(response => response.json())
            .then(setMenu)
            .catch(console.error);
    }, [id]);

    return (
        <>
            <Header/>
            <article className="d-flex justify-content-center">
                <div className="d-flex justify-content-evenly flex-wrap w-75">
                    {
                        menu.map((item: any) => {
                            return (
                                <div className="d-flex align-items-start flex-column m-sm-auto border border-black rounded ">
                                    <Link to={"/options/" + item._id} className="text-decoration-none text-black">
                                        <img className="rounded" src={"../images/menu/" + item.images} alt={item.name}/>
                                        <h3 className="fw-bold">{item.name}</h3>
                                        <div className="text-body-tertiary">Cena: {item.price}PLN</div>
                                        <div className="text-body-tertiary">
                                            {
                                                item.products.map((product: any, index:number) => {
                                                    if (index < item.products.length - 1) {
                                                        return (<span>{product}, </span>);

                                                    }
                                                    return (<span>{product}</span>);
                                                })
                                            }
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </article>
        </>
    );
}

export default Order;
