import React from "react";
import { useEffect, useState} from 'react';

import { Posts } from "../feed/posts";
import { Chat } from "../feed/chat";
import { Profile } from "../feed/profile";
import { Friends } from "../feed/friends";

export function Feed(){
    
    const [tabIndex, setTabIndex] = useState(3);

    return(
        <div className="container-fluid">
            <div className="row p-0 m-0" style={{height:"100vh"}}>
                <div className="col-lg-3 p-5 text-light text-center">
                    <h3 className="">U-Link</h3>
                    <hr/>
                    <div className="d-block w-100">
                        <img className="img-fluid mb-3 rounded-circle shadow" src="https://dummyimage.com/300x300/000/fff" alt=""/>
                        <h5>Nombre de Usuario</h5>
                    </div>
                    <hr/>
                    <div className="d-block w-100">
                        <ul className="list-group">
                            <li className={tabIndex===1?"list-group-item bg-dark":"list-group-item"} 
                                onClick={()=>setTabIndex(1)}>Publicaciones</li>
                            <li className={tabIndex===2?"list-group-item bg-dark":"list-group-item"} 
                                onClick={()=>setTabIndex(2)}>Amigos</li>
                            <li className={tabIndex===3?"list-group-item bg-dark":"list-group-item"} 
                                onClick={()=>setTabIndex(3)}>Chat</li>
                            <li className={tabIndex===4?"list-group-item bg-dark":"list-group-item"} 
                                onClick={()=>setTabIndex(4)}>Perfil</li>
                            <li className={tabIndex===5?"list-group-item bg-dark":"list-group-item"} 
                                onClick={()=>setTabIndex(4)}>Cerrar Sesión</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-9">
                    {
                        tabIndex === 1 &&
                        <Posts></Posts>
                    }
                    {
                        tabIndex === 2 &&
                        <Friends></Friends>
                    }
                    {
                        tabIndex === 3 &&
                        <Chat></Chat>
                    }
                    {
                        tabIndex === 4 &&
                        <Profile></Profile>
                    }
                </div>
            </div>
        </div>
    )
}