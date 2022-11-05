//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appArchivo = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'

import sha256 from 'js-sha256' // libreria para emcriptar 
import { v4 as uuidv4 } from 'uuid'; // identificador unico

/** importar s3 peticiones */


import {eliminarfotoS3,subirfotoS3} from './uploader.controller.js'
import {ObtenerTags } from './rek.controller.js'

/** VARIABLES DE NOMBRE DE TIPO DE ARCHIVOS CARGADOS A S3 */

const imageS3 = "https://grupo4proyecto2.s3.amazonaws.com/fotos/";

// ########################################################################
appArchivo.use(bodyParser.json());


appArchivo.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

appArchivo.get('/holaArchivo', function (req, res ) {
	res.json({messaje: 'Hola desde el controlador de Archivo'})
});

// CREAR ARCHIVO (SUBIRLO)
appArchivo.post('/uploadFile',(request, response)=>{
    let tags = "";
    //RECOGER DATOS
    var idUsuario = request.body.idUser;
    var file = request.body.photo;
    var descripcion = request.body.description;
    
    var uniqueId = uuidv4();
    
    /**
     * data:image/png;base64,
     * data:text/plain;base64,
     * data:application/pdf;base64,
     */
    // para etiquetas
    
    let foto = (file.split(";base64,")[1]);
    //ObtenerTags (foto);



    const format = file.substring(file.indexOf('data:')+5, file.indexOf(';base64'));
    var extension = "." +format.split("/")[1];

    console.log(format);
    console.log(extension);
   
    
    var urlS3;
    urlS3 = imageS3 + uniqueId+ extension;
    console.log(urlS3);

    // ORDEN DE LOS DATOS EN EL PROCEDURE ->  DESCRIPCION, PUBLICO, ID USER, FECHA, ETIQUETAS, URL
    var miQuery = "CALL insertarPublicaciones( '" + descripcion + "', 1 ,"+ idUsuario + ", NOW() , '" + tags + "' , '" + urlS3 + "');" ;

    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err );
            response.status(502).json('false');
        }else{
            try {
                console.log("subiendo Foto")
                subirfotoS3(request, uniqueId, format, extension)
                var miQuery = "select max(idPublicacion) as idM from Publicaciones;"
                conn.query(miQuery, function(err, result){
                    if(err){
                        console.log(err );
                        response.status(502).json('false');
                    }else{
                        console.log(result[0].idM)
                        ObtenerTags (foto,result[0].idM);
                        response.status(200).json('Status: true');
                    }
                });   
            } catch (error) {
                response.status(502).json('no foto');
            }
            
        }
    });   
})


//  BORRAR ARCHIVO

appArchivo.post('/deleteFile',(request, response)=>{
    //RECOGER DATOS
    var idUsuario = request.body.idUsuario;
    var id_file = request.body.id_file;
    var pwd = request.body.pwd;
    var url;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+idUsuario+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ); " 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined ){
            console.log(err );
            response.status(502).send('Status: bad pwd');
        }else{
            var miQuery2 = "DELETE FROM ARCHIVO WHERE idArchivo = " +
            id_file+ 
            " AND propietario = "+ 
            idUsuario 
            ;
            var miQuery3 = "SELECT URL FROM ARCHIVO WHERE idArchivo = " +
            id_file+ 
            " AND propietario = "+ 
            idUsuario 
            ;
            console.log(miQuery3);
            conn.query(miQuery3, function(err, result){
                if(err){
                    console.log(err);
                    response.status(502).send('Status: false');
                }else {
                    url = result[0].URL;
                    console.log(url);
                    conn.query(miQuery2, function(err, result){
                        if(err){
                            console.log(err);
                            console.log("no se elimino");
                            response.status(502).send('Status: false');
                        }else{
                            eliminarfotoS3(url);
                            response.status(200).send('Status: true');
                        }
                    });
                }
            });
        }
    });     
})



// EDITAR ARCHIVO 

appArchivo.post('/editFile',(request, response)=>{
    //RECOGER DATOS
    var idUsuario = request.body.idUsuario;
    var id_file = request.body.id_file;
    var file_name = request.body.file_name;
    var privado = request.body.private;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+idUsuario+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ); " 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined ){
            console.log(err );
            response.status(502).send('Status: bad pwd');
        }else{
            var miQuery2 = "UPDATE ARCHIVO SET file_name = " +
            "\'"+file_name+"\' , "+ 
            "private = "+ 
            privado +
            " , FechaModificacion = DATE_SUB(now(), INTERVAL 6 HOUR) "+
            "WHERE idArchivo = "+ id_file +
            " AND propietario = "+ idUsuario + " ;"
            ;
            console.log(miQuery2);
            conn.query(miQuery2, function(err, result){
                if(err){
                    console.log(err);
                    response.status(502).send('Status: false');
                }else{
                    console.log(result[0]);
                    response.status(200).send('Status: true');
                }
            });
        }
    });     
})





appArchivo.post('/deleteFilee',(request, response)=>{
    eliminarfotoS3(request, response)
})


export default appArchivo