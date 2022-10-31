import React from "react";

export function User({id, image, name}){
    return(
        <div className="col-md-6 mb-4">
            <div className="row text-light bg-dark rounded m-0 ">
                <div className="col-sm-2 m-0 p-0">
                    <img src={image} width="100%" height="100%" className="rounded"></img>
                </div>
                <div className="col-sm-5 d-flex justify-content-center align-self-center">
                    {name}
                </div>
                <div className="col-sm-5 d-flex justify-content-end align-self-center">
                    <button className="btn btn-sm btn-success rounded-left me-2">Enviar Solicitud</button>
                </div>
            </div>
        </div>
    )
}