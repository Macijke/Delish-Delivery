import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useCookies} from "react-cookie";

interface LoginData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
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
                setCookie('user', json, { path: '/', expires: new Date(), maxAge: 3600});
                history.push('/account');
            } else {
                setError('Invalid username or password');
            }
        }).catch(console.error);
    };

    return (
        <form onSubmit={login} className="p-3">
            <div className="mb-3">
                <label className="form-label">Username:</label>
                <input type="text" name="email" onChange={handleInputChange} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" name="password" onChange={handleInputChange} className="form-control"/>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Log in</button>
        </form>
    );
};

export default LoginForm;