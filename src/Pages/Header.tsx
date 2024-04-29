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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        {data.map(({link, name}) => (
                            <li key={link} className="nav-item">
                                <Link to={link}
                                      className={link === location.pathname ? 'nav-link active' : 'nav-link'}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;