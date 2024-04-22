import 'bootstrap/dist/css/bootstrap.css';
import {useLocation, Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const Header = () => {
    const location = useLocation();
    const [cookies] = useCookies(['user']);
    const data = [
        { link: '/', name: 'Strona główna' },
        { link: '/restaurants', name: 'Restauracje' },
        { link: '/cart', name: 'Koszyk' },
        { link: '/account', name: cookies.user ? 'Konto' : 'Zaloguj się'},
    ];

    return (
        <nav>
            <ul className="nav nav-underline d-flex justify-content-evenly mb-4 mt-2">
                {data.map(({link, name}) => (
                    <li key={link} className="nav-item">
                        <Link to={link} className={link === location.pathname ? 'active nav-link' : 'nav-link'}>{name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Header;