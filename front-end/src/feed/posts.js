import React from "react";
import { useEffect, useState } from 'react';

import { Post } from "../components/post";

export function Posts(){

    const [tabIndex, setTabIndex] = useState(2);
    const [posts, setPosts] = useState();
    const [frindPost, setFrindPost] = useState();

    useEffect(() => {
        const reqOps = {
            method: 'GET',            
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/userFiles/${localStorage.getItem("idUsuario")}`, reqOps)
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        });
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/friendFiles/${localStorage.getItem("idUsuario")}`, reqOps)
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        });
    }, []);
 
    return(
        <div className="container p-5">
            <h3 className="text-light">Publicaciones</h3>
            <hr className="text-light"/>
            <div className="text-light">
                <button className={tabIndex===1?"btn btn-dark me-3":"btn me-3 text-light"} 
                    onClick={()=>setTabIndex(1)}>Mis Publicaciones</button>
                <button className={tabIndex===2?"btn btn-dark":"btn text-light"} 
                    onClick={()=>setTabIndex(2)}>Publicaciones de Amigos</button>                    
            </div>
            <hr className="text-light"></hr>
            {
                tabIndex === 1 &&
                <div className="row">
                    {
                        posts && posts.map( (obj, index) => {
                            return(<Post
                                key={index}
                                user={obj.user}
                                image={obj.url}
                                description={obj.descripcion}
                                date={obj.fechaPublicacion}
                            ></Post>)
                        })
                    }
                </div>
            }
            {
                tabIndex === 2 &&
                <div className="row hidden-md-up">
                    <Post 
                        image={"https://dummyimage.com/300x300/000/fff"}
                        description={"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
                    ></Post>
                </div>
            }
        </div>
    )
}