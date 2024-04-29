import {useCookies} from "react-cookie";
import React, {useState} from "react";
import {Errors} from "./Errors";
import {Link} from "react-router-dom";
import Header from "./Header";

function OrderData() {
    const [changed, setChanged] = useState(false);
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
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const userCookie = cookie.user;

    const handleSubmit = (event: React.FormEvent) => {
event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost:3333/editData', {
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
                setChanged(true);
                setCookie('user', json, {path: '/', expires: new Date(), maxAge: 3600});
            }
        }).catch(console.error);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rPassword: '',
            adressCity: '',
            adressStreet: '',
            adressNumber: ''
        });
    }

    return (
        <>
            <Header/>
            {userCookie !== undefined && (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <form id="editForm" method="post" action="#" onSubmit={handleSubmit}
                                          className="form-detail">
                                        <div className="form-right">
                                            <h2>Dane do dostaw jedzenia</h2>
                                            <div className="form-row">
                                                <input type="hidden" name="userId" value={userCookie._id}/>
                                                <label htmlFor="adressCity">Miejscowość</label>
                                                <input
                                                    id="adressCity"
                                                    type="text"
                                                    name="adressCity"
                                                    defaultValue={userCookie.adressCity}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                                <span>{errors.adressCity ? errors.adressCity : ''}</span>
                                            </div>

                                            <div className="form-row">
                                                <label htmlFor="adressStreet">Ulica</label>
                                                <input
                                                    id="adressStreet"
                                                    type="text"
                                                    name="adressStreet"
                                                    defaultValue={userCookie.adressStreet}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                                <span>{errors.adressStreet ? errors.adressStreet : ''}</span>
                                            </div>

                                            <div className="form-row">
                                                <label htmlFor="adressNumber">Numer budynku</label>
                                                <input
                                                    id="adressNumber"
                                                    type="text"
                                                    name="adressNumber"
                                                    defaultValue={userCookie.adressNumber}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                                <span>{errors.adressNumber ? errors.adressNumber : ''}</span>
                                            </div>

                                            <div className="form-row mb-3">
                                                <label htmlFor="adressLocal">Numer mieszkania (opcjonalny)</label>
                                                <input
                                                    id="adressLocal"
                                                    type="text"
                                                    name="adressLocal"
                                                    defaultValue={userCookie.adressLocal}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-row">
                                                <button type="submit" className="btn btn-primary register me-2">Edytuj dane
                                                </button>
                                                <Link to="/account" className="btn btn-secondary register">Powrót</Link>
                                            </div>

                                            <div className="form-row">
                                                {changed && (
                                                    <div className="alert alert-success mt-4" role="alert">
                                                        Pomyślnie zakutalizowano dane dostaw.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

        </>
    );
}

export default OrderData;