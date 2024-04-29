import {Errors} from "../Errors";
import React, {useState} from "react";
import Header from "../Header";
import {Link, useHistory} from "react-router-dom";

function RegisterComponent() {
    const [register, setRegister] = useState(false);
    const [errors, setErrors] = useState<Errors>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rPassword: '',
        adressCity: '',
        adressStreet: '',
        adressNumber: ''
    });
    const history = useHistory();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        fetch('http://localhost:3333/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(json => {
            console.log(json)
            if (json.errors) {
                setErrors(json.errors);
            } else {
                setRegister(true);
                setTimeout(() => {
                    history.push('/account');
                }, 3000);
            }
        }).catch(console.error);
    }

    return (
        <>
            <Header/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <form className="row g-3" method="post" onSubmit={handleSubmit}>
                                    <div className="col-12">
                                        <h2>Twoje dane do konta</h2>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label">Imię</label>
                                        <input id="firstName" type="text" name="firstName" className="form-control"/>
                                        <span className="text-danger">{errors.firstName ? errors.firstName : ''}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label">Nazwisko</label>
                                        <input id="lastName" type="text" name="lastName" className="form-control"/>
                                        <span className="text-danger">{errors.lastName ? errors.lastName : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input id="email" type="text" name="email" className="form-control"/>
                                        <span className="text-danger">{errors.email ? errors.email : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Hasło</label>
                                        <input id="password" type="password" name="password" className="form-control"/>
                                        <span className="text-danger">{errors.password ? errors.password : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="rPassword" className="form-label">Powtórz hasło</label>
                                        <input id="rPassword" type="password" name="rPassword"
                                               className="form-control"/>
                                        <span className="text-danger">{errors.rPassword ? errors.rPassword : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <h2>Dane do dostaw jedzenia</h2>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="adressCity" className="form-label">Miejscowość</label>
                                        <input id="adressCity" type="text" name="adressCity" className="form-control"/>
                                        <span
                                            className="text-danger">{errors.adressCity ? errors.adressCity : ''}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="adressStreet" className="form-label">Ulica</label>
                                        <input id="adressStreet" type="text" name="adressStreet"
                                               className="form-control"/>
                                        <span
                                            className="text-danger">{errors.adressStreet ? errors.adressStreet : ''}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="adressNumber" className="form-label">Numer budynku</label>
                                        <input id="adressNumber" type="text" name="adressNumber"
                                               className="form-control"/>
                                        <span
                                            className="text-danger">{errors.adressNumber ? errors.adressNumber : ''}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="adressLocal" className="form-label">Numer mieszkania
                                            (opcjonalny)</label>
                                        <input id="adressLocal" type="text" name="adressLocal"
                                               className="form-control"/>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary" type="submit">Zarejestruj</button>
                                        <h3>Masz już konto?</h3>
                                        <Link to="/account" className="btn btn-secondary">Zaloguj się!</Link>
                                    </div>
                                    {register && (
                                        <div className="alert alert-success mt-4" role="alert">
                                            Pomyślnie zarejestrowano. Za chwilę zostaniesz przekierowany na stronę logowania.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent;