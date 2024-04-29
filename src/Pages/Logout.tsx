import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

function Logout() {
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const history = useHistory();

    useEffect(() => {
        removeCookie('user');
        history.push('/');
    }, [cookie, history, removeCookie]);

    return null;
}

export default Logout;