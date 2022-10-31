import React from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { useEffect, useState, useRef, useCallback } from 'react';
import { HomeHeader } from "../components/home-header";


export function Register(){
    //INDEX 
    const [tabIndex, setTabIndex] = useState(1);
    //FORM DATA
    const [formData, setFormData] = useState({
        full_name:"",
        user:"",
        email:"",
        password: "",
        password2: "",
    });
    //WEBCAM
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    //BASE 64
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    //INPUT HANDLER
    const handleChange = (evt) => {
        if(evt.target.name === 'file'){
            let file = evt.target.files[0];
            getBase64(file).then(result => {
                setImgSrc(result);
            }).catch(err => {
                console.log(err);
            });
        }else{
            setFormData({...formData, [evt.target.name]: evt.target.value});
        }
    };

    //CAPTURE HANDLER
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef, setImgSrc]);
    
    //SUBMIT HANDLER
    const handleSubmit = (evt) => {
        let obj = {
            full_name: formData.full_name,
            user: formData.user,
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            photo: imgSrc
        }
        if(Object.values(obj).indexOf("") > -1){
            alert("Hacen falta campos!")
        }else{
            console.log(obj)
            // useEffect(() => {    
            //     const reqOps = {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' }
            //         body: JSON.stringify(obj)
            //     };
                
            //     fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/desarrollo`, reqOps)
            //     .then(res => res.json())
            //     .then(data => setData(data));
            // }, []);
        }
    }

    return(
        <div className="container text-light">
            <HomeHeader></HomeHeader>
            <div className="container">
                <div className="row justify-content-center align-items-center mt-5">
                    <div className="col-lg-6 p-5">
                        <h2 className="text-center mt-3">Registro de Usuario</h2>
                        <hr/>
                        <div className="form-group mt-3">
                            <input name="full_name" type="text" className="form-control" placeholder="Nombre Completo" onChange={handleChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="user" type="text" className="form-control" placeholder="Usuario" onChange={handleChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="email" type="email" className="form-control" placeholder="Correo electrónico" onChange={handleChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="password" type="password" className="form-control" placeholder="Contraseña" onChange={handleChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="password2" type="password" className="form-control" placeholder="Confirmar Contraseña" onChange={handleChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <center>
                                <span role="button" className={tabIndex === 1 ? "btn btn-dark" : "btn text-light"} 
                                    onClick={() => setTabIndex(1)}>Subir Foto</span>
                                <span role="button" className={tabIndex === 2 ? "btn btn-dark ms-2" : "btn ms-2 text-light"} 
                                    onClick={() => setTabIndex(2)}>Tomar Foto</span>
                            </center>
                            {
                                tabIndex === 1 && 
                                <div className="form-group mt-3">
                                    <div className="input-group custom-file-button">
                                        <label className="input-group-text" htmlFor="inputGroupFile">Subir Foto</label>
                                        <input name="file" type="file" accept="image/*" className="form-control" id="inputGroupFile" onChange={handleChange} />
                                    </div>
                                </div>
                            }
                            {
                                tabIndex === 2 &&
                                <div className="form-group mt-2">
                                    <Webcam width="100%" audio={false} ref={webcamRef} screenshotFormat={"image/jpeg"}/>
                                    <button className="btn btn-sm btn-dark mb-2" style={{width:"100%"}} onClick={capture}>Capturar foto</button>
                                </div>
                            }
                        </div>
                        <div className="form-group mt-3">
                            {imgSrc && 
                            <div>
                                <center><h5>Foto seleccionada</h5></center>
                                <hr></hr>
                                <img src={imgSrc} alt="" width="100%"/>
                            </div>}
                        </div>
                        <div className="row justify-content-center align-items-center mt-4">
                            <div className="col-5 p-2">
                                <button type="submit" onClick={handleSubmit} className="btn btn-dark col-12">Registrarse</button>
                            </div>
                            <div className="col-5 p-2">
                                <Link to="/" className="btn btn-dark col-12">Cancelar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}