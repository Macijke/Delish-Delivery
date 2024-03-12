import 'bootstrap/dist/css/bootstrap.css';
import {useLocation, Link} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const data = [
        { link: '/', name: 'Strona główna' },
        { link: '/restaurations', name: 'Restauracje' },
        { link: '/cart', name: 'Koszyk' },
        { link: '/account', name: 'Zaloguj się' },
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