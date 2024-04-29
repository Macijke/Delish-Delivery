import {Link} from "react-router-dom";
import OrderHistory from "../OrderHistory";

function AccountComponent() {
    return (
        <>
            <div className="container">
                <nav>
                    <ul className="nav nav-underline justify-content-evenly mt-4 mb-4">
                        <li className="nav-item">
                            <Link to="/account/order/orderdata" className="nav-link">Zmień dane dostawy</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/account/logout" className="nav-link">Wyloguj</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <OrderHistory />
        </>

    )
}

export default AccountComponent;