import React from "react";
import Webcam from "react-webcam";
import { useEffect, useState, useRef, useCallback } from 'react';
import { HomeHeader } from "../components/home-header";

export function Login(){
    //INDEX 
    const [tabIndex, setTabIndex] = useState(1);

    //FORM DATA
    const [formData, setFormData] = useState({
        email:"",
        email2:"",
        password: ""
    });

    //WEBCAM DATA
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    
    //INPUT HANDLER
    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    };

    //CAPTURE HANDLER
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef, setImgSrc]);

    async function submitCredentials(){
        const reqOps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/login`, reqOps);
        const data = await response.json().then( res => {
            localStorage.setItem("idUsuario", res.idUsuario);
            localStorage.setItem("fullname", res.fullname);
            localStorage.setItem("user", res.user);
            localStorage.setItem("email", res.email);
            localStorage.setItem("photo", res.photo);
            localStorage.setItem("modoBot", res.modoBot);
            window.location.href = "./feed";
        });
    }

    async function submitFace(){
        let obj = {
            email: formData.email2,
            photo: imgSrc
        }
        const reqOps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/loginFacial`, reqOps);
        const data = await response.json().then( res => {
            if(res !== undefined){
                localStorage.setItem("idUsuario", res.result[0].idUsuario);
                localStorage.setItem("fullname", res.result[0].fullname);
                localStorage.setItem("user", res.result[0].user);
                localStorage.setItem("email", res.result[0].email);
                localStorage.setItem("photo", res.result[0].photo);
                localStorage.setItem("modoBot", res.result[0].modoBot);
                window.location.href = "./feed"
            }
        });
    }
    
    return(
        <div className="container text-light">
            <HomeHeader></HomeHeader>
            <div className="container">
                <div className="row justify-content-center align-items-center mt-5 ">
                    <div className="col-lg-6 p-5 mt-2">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <hr/>
                        <div className="form-group mt-3">
                            <center>
                                <span role="button" className={tabIndex === 1 ? "btn btn-dark" : "btn text-light"} 
                                    onClick={() => setTabIndex(1)}>Usuario y Contraseña</span>
                                <span role="button" className={tabIndex === 2 ? "btn btn-dark ms-2" : "btn ms-2 text-light"} 
                                    onClick={() => setTabIndex(2)}>Reconocimiento Facial</span>
                            </center>
                        </div>
                        {
                            //USER AND PASSWRD FORM 
                            tabIndex === 1 && 
                            <div>
                                <div className="form-group mt-3">
                                    <input name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nombre de Usuario"
                                        required />
                                </div>
                                <div className="form-group mt-3">
                                    <input name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Contraseña"
                                        required/>
                                </div>
                                <div className="row justify-content-center align-items-center mt-4">
                                    <div className="col-5 p-2">
                                        <button type="submit" className="btn btn-dark col-12" onClick={submitCredentials}>Iniciar Sesión</button>
                                    </div>
                                </div> 
                            </div>
                        }
                        {
                            tabIndex === 2 && 
                            <div className="form-group mt-2">
                                <div className="form-group mt-3 mb-3">
                                    <input name="email2" 
                                        value={formData.email2} 
                                        onChange={handleChange} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nombre de Usuario"
                                        required />
                                </div>
                                <Webcam width="100%" audio={false} ref={webcamRef} screenshotFormat={"image/jpeg"}/>
                                <button className="btn btn-dark mb-2" style={{width:"100%"}} onClick={capture}>Capturar Foto</button>
                            </div>
                        }
                        <div className="form-group mt-3">
                            {
                                imgSrc && tabIndex === 2 &&
                                <div>
                                    <center><h5>Foto seleccionada</h5></center>
                                    <hr></hr>
                                    <img src={imgSrc} alt="" width="100%"/>
                                    <div className="row justify-content-center align-items-center mt-4">
                                        <div className="col-5 p-2">
                                            <button type="submit" className="btn btn-dark col-12" onClick={submitFace}>Iniciar Sesión</button>
                                        </div>
                                    </div> 
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}