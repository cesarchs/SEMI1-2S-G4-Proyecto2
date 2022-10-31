import React from "react";
import { HomeHeader } from "../components/home-header";


export function Home(){
    return (
        <div className="text-center text-white" style={{height:"100vh"}}>
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <HomeHeader></HomeHeader>
                <div className="px-3" style={{marginTop:"20vh"}}>
                    <h1>Proyecto 2 - G#4</h1>
                    <p className="lead">
                    Esta aplicación está permite compartir publicaciones a los usuarios registrados. 
                    Tiene las funcionalidades de login, registro de usuarios, ver
                    publicaciones, crear publicaciones, chatear con amigos y bots para obtener información sobre la
                    facultad de ingenieria, así como la traducción de publicaciones.
                    </p>
                    <p className="lead">
                        <a href="/" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Enlace Repositorio</a>
                    </p>
                </div>
            </div>
        </div>
    );
}