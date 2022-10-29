import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Feed } from "./pages/feed";

export function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home/> } />
                    <Route path='/login' element={ <Login/> } />
                    <Route path='/register' element={ <Register/> } />
                    <Route path='/feed' element={ <Feed/> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}