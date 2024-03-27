import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Restaurants from "./Pages/Restaurants";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";
import Menu from "./Pages/Menu";
import Order from "./Pages/Order";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
        <Switch>
            <Route path="/" exact component={App}></Route>
            <Route path="/restaurants" component={Restaurants}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/account" component={Account}/>
            <Route path="/menu/:id" component={Menu}/>
            <Route path="/order/:foodId/:restaurantId" component={Order}/>
        </Switch>
    </Router>
);

