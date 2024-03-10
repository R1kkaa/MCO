import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './header';
import { Header2 } from './header';
import { Header3 } from './header';
import { Header4 } from './header';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Body as Register} from './Register';
import {Body as Login} from './Login';
import {Body as View} from './RestaurantPreview';
import {Body as User} from './Profile';
import {Body as Restaurant} from './ViewRestaurant';
import {Body as Form} from './Form';
import {Body as Edit} from './EditProfile'

export const App = () => {
  return (
    <Routes>
    <Route path="/home/register" element={<><Header/><Register/></>}/>
    <Route path="/home/login" element={<><Header/><Login/></>}/>
    <Route path="/home/main" element={<><Header2/><View/></>}/>
    <Route path="/home/form" element={<><Header4/><Form/></>}/>
    <Route path="/home/main/user" element={<><Header3/><User/></>}/>
    <Route path="/home/main/restaurant/:restaurantid" element={<><Header3/><Restaurant/></>}/>
    <Route path="/home/main/user/editprofile" element={<><Header3/><Edit/></>}></Route>
    </Routes>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(<Router><App /></Router>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
