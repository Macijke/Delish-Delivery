function OrderComponent(order: any) {
    if (order.order.length !== 0) {
        order = order.order[0];

        return (
            <>
                <article className="d-flex justify-content-center flex-wrap">
                    <div className="d-flex flex-column rounded w-25 text-center mb-5">
                        <form>
                            {order.meat.length !== 0 || order.sauces.length !== 0 ?
                                <h1 className="fw-bold">Dodatki</h1> : ""}
                            <div className="mb-4">
                                {order.meat.length === 0 ? "" :
                                    <h4>Mięso:</h4>
                                }
                                {order.meat.map((item: any) => (
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="meat" id={item} value={item}/>
                                        <label className="form-check-label" htmlFor={item}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                {order.sauces.length === 0 ? "" :
                                    <h4>Sos:</h4>
                                }
                                {order.sauces.map((item: any) => (
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="sauce" id={item}
                                               value={item}/>
                                        <label className="form-check-label" htmlFor={item}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className="d-flex flex-column rounded w-25">
                        <img className="rounded w-100" src={`../../images/menu/${order.images}`} alt={order.name}/>
                        <h3 className="fw-bold">{order.name}</h3>
                        <h5 className="fw-bold">Cena: {order.price}PLN</h5>
                        <div className="text-body-tertiary">
                            {order.products.join(', ')}
                        </div>
                    </div>
                </article>
            </>
        );
    } else {
        return <></>;
    }

}

export default OrderComponent;