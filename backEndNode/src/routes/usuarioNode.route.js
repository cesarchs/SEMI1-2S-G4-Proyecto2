import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'
import appArchivo from '../controllers/archivo.controller.js'
import app from '../controllers/rek.controller.js'
import appLogin2 from '../controllers/cognito.controller.js'

const Router = express();

//Routers 
Router.get('/',                     appLogin) // de prueba
Router.get('/holaUsuario',          appUsuario) // de prueba
Router.get('/holaArchivo',          appArchivo) // de prueba
Router.get('/holaU',                appUsuario) // de prueba



//RUTAS LOGIN
Router.post('/login',                 appLogin) //yap
Router.post('/loginFacial',           appLogin) // yap

//RUTAS USUARIO
Router.post('/register',                    appUsuario) // yap
Router.get('/userFiles/:idUsuario',         appUsuario) // yap
Router.get('/friendFiles/:idUsuario',       appUsuario) // YAP
Router.get('/allUsers/:idUsuario',          appUsuario)  // YAP, personas a poder agregar agregar
Router.post('/addFriend',                   appUsuario) // yap
Router.get('/myFriends/:idUsuario',         appUsuario) // mis amigos y estado en el que se ecuentran

//RUTAS ARCHIVO
Router.post('/uploadFile',              appArchivo) // yap
Router.post('/deleteFile',              appArchivo)
Router.post('/editFile',                appArchivo)





// RUTAS PRUEBA S3
Router.post('/subirPdf',                appArchivo)
Router.post('/subirtxt',                appArchivo)
Router.get('/allFile',                  appArchivo)
Router.post('/getPhoto',                appArchivo)
Router.post('/subirfoto',               appArchivo)
Router.post('/deleteFilee',             appArchivo)

// PRUEBAASSS rek
Router.get('/rek',                          app)
Router.post('/detectarcara',                app)
Router.post('/detectartexto',               app)
Router.post('/detectarfamoso',              app)
Router.post('/detectaretiquetas',           app)
Router.post('/compararfotos',               app)


// PRUBAS RUTAS COGNITO 
Router.post('/api/login',               appLogin2) 
Router.post('/signup',                  appLogin2) 
Router.get('/COG',                      appLogin2) 


export default Router
