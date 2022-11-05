//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import { v4 as uuidv4 } from 'uuid';
import express from 'express'
const appUsuario = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'
appUsuario.use(bodyParser.json());
/**
 * Básicamente, lo que body-parser es lo que permite a Express leer el cuerpo 
 * y luego analizarlo en un objeto Json que podamos entender
 */

/** importar s3 peticiones */

import {holaU, subirfotoS3 } from './uploader.controller.js'


import sha256 from 'js-sha256' // libreria para emcriptar 


/** VARIABLES DE NOMBRE DE TIPO DE ARCHIVOS CARGADOS A S3 */

const imageS3 = "https://grupo4proyecto2.s3.amazonaws.com/fotos/";

/**
 * El encabezado de respuesta Access-Control-Allow-Origin 
 * indica si los recursos de la respuesta pueden ser compartidos con el origen (en-US) dado
 * 
 * El encabezado de respuesta Access-Control-Allow-Headers es usado en la respuesta a una 
 * solicitud preflight para indicar cuáles encabezados HTTP pueden ser usados durante dicha solicitud
 */

appUsuario.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

appUsuario.get('/holaUsuario', function (req, res ) {
	res.json({messaje: 'Hola desde controlador usuario'})
});

appUsuario.get('/holaU', function (req, res ) {
	holaU(req,res)
});


// REGISTRAR USUARIO
appUsuario.post('/register',(request, response)=>{
    var user = request.body.user;
    var fullname = request.body.full_name;
    var email = request.body.email;
    var pwd = request.body.password;
    var foto = request.body.photo;
    var modoBot = 'DESACTIVADO';

    var uniqueId = uuidv4();

    const format = foto.substring(foto.indexOf('data:')+5, foto.indexOf(';base64'));
    var extension = "." +format.split("/")[1];
    var urlPhotoS3 = imageS3+uniqueId+ extension ;
    
    console.log(format);
    console.log(extension);
    console.log(urlPhotoS3);

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO WHERE USUARIO.user = " +
    "\'"+user+"\' " +
    "or USUARIO.email = "+
    "\'"+email+"\' ;" 
    ;
    console.log(miQuery);
    conn.query("START TRANSACTION;");
    conn.query(miQuery, function(err, result){
        if(err || result[0] != undefined){
            console.log(err);
            conn.query("ROLLBACK;");
            response.status(502).json('Status: UserExists');
        }else{
            
            var miQuery2 = "call insertarUsuario( " +
                            "\'"+fullname+"\' ,"+
                            "\'"+user+"\' ,"+
                            "\'"+email+"\' ,"+
                            "\'"+hash+"\', " +
                            "\'"+urlPhotoS3+"\' ,"+
                            "\'"+modoBot+"\');"
                            ;
            console.log(miQuery2);
            conn.query(miQuery2, function(err, result){
                if(err){
                    console.log(err);
                    conn.query("ROLLBACK;");
                    response.status(502).json('Status: false');
                }else{
                    try {
                        subirfotoS3(request,uniqueId,format,extension);
                        //console.log(result[0]);
                        response.status(200).json('Status: true');
                        conn.query("COMMIT;");
                    } catch (error) {
                        conn.query("ROLLBACK;");
                        console.log("fallo al subir la imagen al S3");
                        response.status(502).json('Status: false');
                    }
                }
            });
        }
    }); 
})


// ARCHIVOS DE MI USUARIO, O ARCHIVOS SEGUN ID

appUsuario.get('/userFiles/:idUsuario',(request, response)=>{
    var idUser = request.params.idUsuario;
    var miQuery = "CALL misPublicaciones( " + idUser +");"
    ;
    console.log(miQuery);
    let ans;
    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).json([]);//se cambio ya no retorna un error por que asi lo controlan en el front (bugfix)
        }else{
            console.log(result[0]);
            response.status(200).json(result[0]);
        }
    }); 
})

// ARCHIVOS PUBLICOS DE USUARIOS AMIGO

appUsuario.get('/friendFiles/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = "SELECT aux.idArchivo, aux.tipoArchivo, aux.URL , aux.file_name, aux.user, date_format(aux.FechaModificacion, '%d/%m/%Y') AS FechaModificacion " +
    "FROM ( "+
        "SELECT a.idArchivo, a.tipoArchivo, a.URL , u.idUsuario, a.file_name, u.user, a.FechaModificacion "+
        "FROM USUARIO u "+
        "INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario "+
        "WHERE a.private = 0 AND u.idUsuario <> " + idUser +
        ") aux "+
    "INNER JOIN( "+
            "(SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = "+ idUser +" ) "+
            "UNION "+
            "(SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = "+ idUser +" ) "+
        ")aux1 ON aux.idUsuario = aux1.idUsuario "+
    "ORDER BY aux.user ASC; "
    ;

    console.log(miQuery);
    
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined){
            console.log(err);
            response.status(200).json([]); //se cambio ya no retorna un error por que asi lo controlan en el front
        }else{
            console.log(result);
            response.status(200).send(result);
        }
    }); 
})

// TODOS LOS USUARIOS 

appUsuario.get('/allUsers/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = "CALL NuevosAmigos( "+ idUser + " );"
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send('Status: false');
        }else {
            console.log(result);
            response.status(200).send(result[0]);
        }
    }); 
})


// AGREGAR AMIGO

appUsuario.post('/addFriend',(request, response)=>{
    var id_user = request.body.id_user;
    var id_friend = request.body.id_friend;


    var miQuery = "INSERT INTO AMIGO VALUES( " +
    id_user+", "+
    id_friend+", "+
    "DATE_SUB(now(), INTERVAL 6 HOUR));"
    ;
    console.log(miQuery);

    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            console.log(result[0]);
            response.status(200).send('Status: true');
        }
    }); 
})


appUsuario.get('/myFriends/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = "CALL MisAmigos( "+ idUser + ");"
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send('Status: false');
        }else {
            console.log(result);
            response.status(200).send(result[0]);
        }
    }); 
})


export default appUsuario