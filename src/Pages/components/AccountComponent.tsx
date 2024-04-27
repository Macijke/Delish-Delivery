import {Link} from "react-router-dom";
import OrderHistory from "../OrderHistory";

function AccountComponent() {
    return (
        <>
            <div>
                <nav>
                    <ul className="nav nav-underline d-flex justify-content-evenly mb-4 mt-2">
                        {/* <li key="historiaZamowien" className="nav-item">*/}
                        {/*    <Link to="/account/order/history" className="nav-link">Historia zamówień</Link>*/}
                        {/*</li> */}
                        <li key="informacjeKonta" className="nav-item">
                            <Link to="/account/order/orderdata" className="nav-link">Zmień dane dostawy</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <OrderHistory/>
        </>
    )
}

export default AccountComponent;