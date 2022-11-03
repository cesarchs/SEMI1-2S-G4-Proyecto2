//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS Y S3 ///////////////////////////////////////
import AWS from 'aws-sdk'
import aws_keys from '../db/creds_template.js' // se importa las credenciales para conectarnos a S3, credenciales del usuario IAM
const s3 = new AWS.S3(aws_keys.s3);  //--------> Alamacenamiento S3
const rek = new AWS.Rekognition(aws_keys.rekognition); //----> Inteligencia Artificial 

//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const app = express() 
import bodyParser from 'body-parser'
import cors from 'cors'


// para extender el tamanio aceptado del string que entra en el body
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '25mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }))


//////////////////////////////////////////////////////////////////////////////////
// /////////////////////////// FUNCIONES PARA REKOGNITION  ///////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get('/rek', function (req, res ) {
    console.log ("confirmacion de peticion en rek");
	res.status(200).json([]);
});

// Analizar Emociones Cara
app.post('/detectarcara', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      /* S3Object: {
        Bucket: "mybucket", 
        Name: "mysourceimage"
      }*/
      Image: { 
        S3Object: {
          Bucket: "grupo4proyecto2", 
          Name: "fotos/6591b142-5c8b-4d85-998f-9669856e6416.jpg"
        }
      },
      Attributes: ['ALL']
    };

    rek.detectFaces(params, function(err, data) {
      if (err) {
        console.log(err)
        res.json({mensaje: "Error"})} 
      else {   
             res.json({Deteccion: data});      
      }
    });
  });




  // Analizar texto
  app.post('/detectartexto', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      /* S3Object: {
        Bucket: "mybucket", 
        Name: "mysourceimage"
      }*/
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }
    };
    rek.detectText(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             res.json({texto: data.TextDetections});      
      }
    });
  });





  // Analizar Famoso
  app.post('/detectarfamoso', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      /* S3Object: {
        Bucket: "mybucket", 
        Name: "mysourceimage"
      }*/
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }
    };
    rek.recognizeCelebrities(params, function(err, data) {
      if (err) {
        console.log(err);
        res.json({mensaje: "Error al reconocer"})} 
      else {   
             res.json({artistas: data.CelebrityFaces});      
      }
    });
  });

  



  // Obtener Etiquetas
  app.post('/detectaretiquetas', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      /* S3Object: {
        Bucket: "mybucket", 
        Name: "mysourceimage"
      }*/
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }, 
      MaxLabels: 123
    };
    rek.detectLabels(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             res.json({texto: data.Labels});      
      }
    });
  });





  // Comparar Fotos
  app.post('/compararfotos', function (req, res) { 
    var imagen1 = req.body.imagen1;
    var imagen2 = req.body.imagen2;
    var params = {
      
      SourceImage: {
          Bytes: Buffer.from(imagen1, 'base64')     
      }, 
      TargetImage: {
          Bytes: Buffer.from(imagen2, 'base64')    
      },
      SimilarityThreshold: '80'
      
     
    };
    rek.compareFaces(params, function(err, data) {
      if (err) {res.json({mensaje: err})} 
      else {   
             res.json({Comparacion: data.FaceMatches});      
      }
    });
  });



    //FUNCION Comparar Fotos
    export function compararfotos (req, res) { 
      var imagen1 = req.body.imagen1;
      var imagen2 = req.body.imagen2;
      var params = {
        
        SourceImage: {
            Bytes: Buffer.from(imagen1, 'base64')     
        }, 
        TargetImage: {
            Bytes: Buffer.from(imagen2, 'base64')    
        },
        SimilarityThreshold: '80'
        
       
      };
      rek.compareFaces(params, function(err, data) {
        if (err) {res.json({mensaje: err})} 
        else {   
               res.json({Comparacion: data.FaceMatches});      
        }
      });
    };
  



  export default app