import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'
import appArchivo from '../controllers/archivo.controller.js'
import app from '../controllers/rek.controller.js'

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
Router.post('/register',            appUsuario) // yap
Router.get('/userFiles/:idUsuario',    appUsuario) // yap
Router.get('/friendFiles/:idUser',  appUsuario)
Router.get('/allUsers/:idUser',     appUsuario) 
Router.post('/addFriend',           appUsuario)
Router.get('/myFriends/:idUser',    appUsuario)

//RUTAS ARCHIVO
Router.post('/uploadFile',          appArchivo) // yap
Router.post('/deleteFile',          appArchivo)
Router.post('/editFile',            appArchivo)





// RUTAS PRUEBA S3
Router.post('/subirPdf',            appArchivo)
Router.post('/subirtxt',            appArchivo)
Router.get('/allFile',            appArchivo)
Router.post('/getPhoto',            appArchivo)
Router.post('/subirfoto',           appArchivo)
Router.post('/deleteFilee',           appArchivo)

// PRUEBAASSS rek
Router.get('/rek',                          app)
Router.post('/detectarcara',                app)
Router.post('/detectartexto',               app)
Router.post('/detectarfamoso',              app)
Router.post('/detectaretiquetas',           app)
Router.post('/compararfotos',               app)



export default Router
