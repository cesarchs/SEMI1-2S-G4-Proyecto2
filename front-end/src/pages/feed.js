import React from "react";
import { useEffect, useState, useRef, useCallback } from 'react';

import { SideBar } from "../components/sidebar";

export function Feed(){
    
    const [tabIndex, setTabIndex] = useState(1);

    return(
        <div classNameName="container-fluid">
            <div className="row p-0 m-0" style={{height:"100vh"}}>
                <div className="col-lg-3 p-5 text-light text-center">
                    <h3 className="">U-Link</h3>
                    <hr/>
                    <div className="d-block w-100">
                        <img src="https://dummyimage.com/300x300/000/fff" className="img-fluid mb-3 rounded-circle shadow" alt=""/>
                        <h5>Nombre de Usuario</h5>
                    </div>
                    <hr/>
                    <div className="d-block w-100">
                        <ul className="list-group">
                            <li className="list-group-item bg-dark">Publicaciones</li>
                            <li className="list-group-item">Amigos</li>
                            <li className="list-group-item">Chat</li>
                            <li className="list-group-item">Perfil</li>
                            <li className="list-group-item">Cerrar Sesión</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-9 bg-light">
                    CONTENT
                </div>
            </div>
        </div>
    )
}