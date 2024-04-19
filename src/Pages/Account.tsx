import Header from "./Header";
import LoginComponent from "./components/LoginComponent";
import AccountComponent from "./components/AccountComponent";
import {useCookies} from "react-cookie";

function Account() {
    const [cookies] = useCookies(['user']);
    return(
        <>
            <Header/>
            {cookies.user && <AccountComponent/>}
            {!cookies.user && <LoginComponent/>}
        </>
    )
}

export default Account;