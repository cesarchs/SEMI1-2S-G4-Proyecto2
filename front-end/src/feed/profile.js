import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";

export function Profile(){

    const [tabIndex, setTabIndex] = useState(1);

    const [formData, setFormData] = useState({
        full_name:"",
        user:"",
        email:"",
        password: "",
        password2: "",
    });

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
        <div className="container p-5">
            <h3 className="text-light">Perfil</h3>
            <hr className="text-light"></hr>
            <div className="row">
                <div className="col-lg-7 text-light me-5">
                    <center><h4 className="text-light mb-5">Datos Personales</h4></center>
                    <div className="form-group row mb-3">
                        <label className="col-sm-4 col-form-label">Nombre Completo: </label>
                        <div className="col-sm-8">
                            <input name="full_name" type="text" className="form-control" placeholder="Nombre Completo" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-sm-4 col-form-label">Usuario: </label>
                        <div className="col-sm-8">
                            <input name="user" type="text" className="form-control" placeholder="Usuario" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-sm-4 col-form-label">Correo Electrónico: </label>
                        <div className="col-sm-8">
                            <input name="email" type="email" className="form-control" placeholder="Correo electrónico" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-sm-4 col-form-label">Contraseña: </label>
                        <div className="col-sm-8">
                        <input name="password" type="password" className="form-control" placeholder="Confirmar Contraseña" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        Cambiar Foto:
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
                            <div className="form-group mt-2" style={{width:"60%", marginLeft:"20%"}}>
                                <Webcam width="100%" audio={false} ref={webcamRef} screenshotFormat={"image/jpeg"}/>
                                <button className="btn btn-sm btn-dark mb-2" style={{width:"100%"}} onClick={capture}>Capturar foto</button>
                            </div>
                        }
                    </div>                   
                </div>
                <div className="col-lg-4">
                    <center><h4 className="text-light mb-5">Foto de Perfil</h4></center>
                    {
                        imgSrc &&
                            <img src={imgSrc} className="rounded-circle" alt="" width="100%"/>
                    }
                </div>
            </div>
        </div>
    )
}