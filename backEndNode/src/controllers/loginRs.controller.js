//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 



import {compararfotos } from './rek.controller.js'
import {loginCognito} from './cognito.controller.js'
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appLogin = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'

import sha256 from 'js-sha256' // libreria para emcriptar 

appLogin.use(bodyParser.json());


appLogin.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

  appLogin.get('/', function (req, res ) {
    console.log ("confirmacion de peticion");
	res.status(200).json([]);
});



// peticion para log in 
appLogin.post('/login',(request, response)=>{
    var user = request.body.email;
    var pwd = request.body.password;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( user = ' + "\'"+user+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ) ;" 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined){
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            try {
                loginCognito(user,pwd,result,response);
                
            } catch (error) {
                response.status(502).send('Status: false');
            }
        }
    }); 
})


/**
 *   // FALLA DE LOG IN CON ASINCROMISMO
 * appLogin.post('/login', async (request, response)=>{
    var user = request.body.email;
    var pwd = request.body.password;

    var hash = sha256(pwd);

    await loginCognito(user,pwd).then(m => {

        if (m) {
            console.log("ya llego")
            var miQuery = "SELECT * FROM USUARIO " +
            'WHERE ( user = ' + "\'"+user+"\' "+ 
            'AND pwd = '+"\'"+hash+"\' ) ;" 
            ;
            console.log(miQuery);
            conn.query(miQuery, function(err, result){
                if(err || result[0] == undefined){
                    console.log(err);
                    response.status(502).send('Status: false');
                }else{
                    console.log(result[0]);
                    response.status(200).send(result[0]);
                }
            }); 
          // es true que es lo que va a realizar
        }
        else {
          // de ser falso que es lo que realiza
          console.log("nunca llego :'(")
        }
      
      });
})
 */

// log in solo con reconocimiento facil
/*
// login con recorrido de fotos
appLogin.post('/loginFacial',(request, response)=>{
    var user = request.body.email;
    var photo = request.body.photo;

    let foto = (photo.split(";base64,")[1]);
    
    //Quitar formato de imagen al inicio del archivo base64

    var miQuery = "SELECT photo FROM USUARIO;" ;

    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined){
            console.log(err);
            response.status(502).json('Status: false');
        }else{
            for (let i = 1; i <= result.length; i++) {
                const element = ( result[i].photo.split("https://grupo4proyecto2.s3.amazonaws.com/")[1]);
                if (element != undefined){
                    if (compararfotos(element,foto,ans)){
                        console.log(ans)
                        break;
                        
                    }
                        console.log("false")
                }
            }
        }
    }); 
})
*/



// login con recorrido de fotos
appLogin.post('/loginFacial',(request, response)=>{
    var user = request.body.email;
    var photo = request.body.photo;

    let foto = (photo.split(";base64,")[1]);
    
    //Quitar formato de imagen al inicio del archivo base64

    var miQuery = "SELECT * FROM USUARIO as usu WHERE usu.email = '" + user + "' OR usu.user = '" + user + "';" ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0].photo == undefined){
            console.log(err);
            response.status(502).json('Status: false');
        }else{
            const element = ( result[0].photo.split("https://grupo4proyecto2.s3.amazonaws.com/")[1]);
            let ans = "";
            if (element != undefined){
                console.log(element)
                if (compararfotos(element,foto,result,response)){
                    console.log(ans)
                }    
                else {console.log("esperando resultado")
                    //response.status(502).json('Status: falseF')
                }
            }else {console.log ("tipo imagen no valida") 
                response.status(502).json('Status: falseT');}
        }
    }); 
})







export default appLogin