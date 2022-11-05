import React from "react";
import { useEffect, useState } from 'react';
const moment = require('moment');

export function Post({id, user, image, description, date}){

    const [translated, setTranslated] = useState("");

    async function translator(evt){
        let obj = {
            descripcion: description,
            idioma:evt.target.value
        }
        console.log(obj)
        const reqOps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        const response = await fetch(`https://in0w1c6qs2.execute-api.us-east-1.amazonaws.com/faseTranslate`, reqOps);
        const data = await response.then( res => {
            console.log(res)
            setTranslated(res)
        });
    }

    return(
        <div className="col-md-4 mb-4">
            <div className="card shadow border-0 bg-dark text-light">
            <div className="card-header border-bottom border-secondary mb-3">
                <div className="row">
                    <div className="col-6">
                        {user}
                    </div>
                    <div className="col-6">
                        <small className="text-secondary">{moment(date,"YYYY-MM-DDThh:mm:ss.sTZD").subtract(6, 'hours').fromNow()}</small>
                    </div>
                </div>
            </div>
            <img className="card-img-top" src={image} alt=""/>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                    <hr></hr>
                    <div className="row">
                        <div className="col-lg-4 py-0">
                            <small className="text-sm align-middle">Idioma: </small>
                        </div>
                        <div className="col-lg-8 py-0">
                            <select id="language" onChange={translator} className="form-select form-select-sm bg-dark custom-select" style={{color:"white"}}>
                                <option value="original">Original</option>
                                <option value="ingles">Inglés</option>
                                <option value="frances">Francés</option>
                                <option value="ruso">Ruso</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}