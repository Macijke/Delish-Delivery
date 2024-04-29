import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useCookies} from "react-cookie";

interface LoginData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginData>({email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const [cookies, setCookie] = useCookies(['user']);
    const history = useHistory();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        fetch(`http://localhost:3333/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginData),
        }).then(response => response.json()).then(json => {
            if (loginData.email === json.email && loginData.password === json.password) {
                setLoggedIn(true);
                setTimeout(() => {
                    setCookie('user', json, { path: '/', expires: new Date(), maxAge: 3600});
                    }, 3000);
            } else {
                setError('Nieprawidłowy adres email lub hasło. Spróbuj ponownie.');
            }
        }).catch(console.error);
    };

    return (
        <main className="d-flex justify-content-center">
            <article className="w-50 d-flex justify-content-center">
                <form onSubmit={login} className="p-3 flex-grow-1">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adres email:</label>
                        <input type="text" name="email" onChange={handleInputChange} className="form-control"
                               id="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Hasło:</label>
                        <input type="password" name="password" onChange={handleInputChange} className="form-control"
                               id="password"/>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Zaloguj się</button>
                        <hr/>
                        <h3>Nie masz jeszcze konta?</h3>
                        <Link to="/account/register" className="btn btn-secondary">Zarejestruj się!</Link>
                    </div>
                    {loggedIn && (
                        <div className="alert alert-success mt-4" role="alert">
                            Pomyślnie zalogowano! Za chwilę zostaniesz przekierowany na stronę Twojego konta.
                        </div>
                    )}
                </form>

            </article>
        </main>

    );
};

export default LoginForm;