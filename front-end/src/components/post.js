import React from "react";
import { useEffect, useState } from 'react';

export function Post({id, image, description}){



    return(
        <div className="col-md-4 mb-4">
            <div className="card shadow border-0 bg-dark text-light">
            <img className="card-img-top" src={image} alt=""/>
                <div class="card-body">
                    <p class="card-text">{description}</p>
                    <hr></hr>
                    <div className="row">
                        <div className="col-lg-4 py-0">
                            <small className="text-sm align-middle">Idioma: </small>
                        </div>
                        <div className="col-lg-8 py-0">
                            <select id="language" className="form-select form-select-sm bg-dark custom-select" style={{color:"white"}}>
                                <option>Original</option>
                                <option>Inglés</option>
                                <option>Español</option>
                                <option>Francés</option>
                                <option>Ruso</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}