import React from "react";
import { useEffect, useState } from 'react';

import { Request } from "../components/request";
import { User } from "../components/user";

export function Friends(){

    const [tabIndex, setTabIndex] = useState(1);

    return(
        <div className="container p-5">
            <h3 className="text-light">Amigos</h3>
            <hr className="text-light"></hr>
            <div className="text-light">
                <button className={tabIndex===1?"btn btn-dark me-3":"btn me-3"} 
                    onClick={()=>setTabIndex(1)}>Solicitudes</button>
                <button className={tabIndex===2?"btn btn-dark":"btn"} 
                    onClick={()=>setTabIndex(2)}>Buscar Amigos</button>
            </div>
            <hr className="text-light"></hr>
            {/* FORM PARA BUSCAR */}
            {
            tabIndex === 2 &&
            <div className="mb-3">
                <form> {/*onSubmit={this.search}*/}
                    <div className="row">
                        <div className="col-10">
                            <input name="search" className="form-control" type="text" placeholder="Nombre del Usuario"/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark" style={{width:"100%"}} type="submit">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            }
            {
                tabIndex === 1 &&
                <div className="row hidden-md-up">
                    <Request 
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></Request>
                    <Request 
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></Request>
                    <Request 
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></Request>
                </div>
            }
            {
                tabIndex === 2 &&
                <div className="row hidden-md-up">
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                    <User
                        image={"https://dummyimage.com/100x100/000/fff"}
                        name={"Leonardo Martinez"}
                    ></User>
                </div>
            }
        </div>
    );
}