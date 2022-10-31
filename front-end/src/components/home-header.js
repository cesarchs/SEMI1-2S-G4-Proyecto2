import React from "react";
import { Link } from "react-router-dom";

export function HomeHeader(){
    return(
        <header>
            <div className="p-3">
                <h3 className="float-md-start mb-0"><span href="/">U-Link</span></h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Registrarse</Link>
                </nav>
            </div>
        </header>
    )
}