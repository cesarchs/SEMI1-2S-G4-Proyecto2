//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS Y S3, rek ///////////////////////////////////////
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
    let tags = "";
    var params = {
      /* S3Object: {
        Bucket: "mybucket", 
        Name: "mysourceimage"
      }*/
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }, 
      MaxLabels: 3
    };
    rek.detectLabels(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {
        for (let i = 0; i < data.Labels.length; i++) {
          const element = data.Labels[i].Name;
          if (i==0){
            tags = element
          }else tags += ","+element
        } 
        console.log(tags)
             res.json({texto: tags});      
      }
    });
  });








  // FUNCION Obtener Etiquetas
export function ObtenerTags (imagen, id) { 
  
  var imagen = imagen;
  let tags = "";
  var params = {
    /* S3Object: {
      Bucket: "mybucket", 
      Name: "mysourceimage"
    }*/
    Image: { 
      Bytes: Buffer.from(imagen, 'base64')
    }, 
    MaxLabels: 3
  };
  rek.detectLabels(params, function(err, data) {
    if (err) {console.log("error al ingresar tags")} 
    else {
      for (let i = 0; i < data.Labels.length; i++) {
        const element = data.Labels[i].Name;
        if (i==0){
          tags = element
        }else tags += ","+element
      } 
        if(tags != ""){
          var miQuery = "UPDATE Publicaciones SET etiqueta = '"+ tags +"' WHERE idPublicacion =" + id +";"
          conn.query(miQuery, function(err, result){
            if(err){
              console.log(err );
              //response.status(502).json('false');
              console.log("actualizado")
          }else{
            console.log("se actualizo los tags")

          }
          });
        }else{console.log("tags vacios")}
      

      //console.log("llego al tagsss")
      //console.log(tags)
      //     res.json({texto: tags});
      //return tags;    
    }
  });
};








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
             res.json({Comparacion: data.FaceMatches[0].Similarity});      
      }
    });
  });



    //FUNCION Comparar Fotos
    export function compararfotos (element,foto ,result, response) { 
      var imagen1 = foto;
      var params = {
        
        SourceImage: {
            Bytes: Buffer.from(imagen1, 'base64')     
        }, 
        TargetImage: {
            S3Object: {
              Bucket: "grupo4proyecto2", 
              Name: element
            }    
        },
        SimilarityThreshold: '80'
        
       
      };
      rek.compareFaces(params, function(err, data) {
        if (err) {response.json("no match")} 
        else if (data.FaceMatches[0] != undefined){   
               response.json({result});      
        }else {response.json("no match")}
      });
    };
  



  export default app