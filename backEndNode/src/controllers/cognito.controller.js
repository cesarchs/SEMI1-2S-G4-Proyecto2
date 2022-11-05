// Conexion con Cognito
// cognito
import aws_keys from '../db/creds_template.js'
import AmazonCognitoIdentity from 'amazon-cognito-identity-js' //<------Cognito npm i amazon-cognito-identity-js
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);
// contrasenias
import sha256 from 'js-sha256' // libreria para emcriptar 

// DEPENDECIAS PARA PETICIONES 
import express from 'express'
const appLogin2 = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'


appLogin2.use(bodyParser.json());


appLogin2.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

  export const registroCognito = async (fullname,user,email,pwd) => {
  
    var attributelist = [];
    var dataname = {
        Name: 'name',
        Value: fullname,
    };
    var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);
  
    attributelist.push(attributename);
  
    var dataemail = {
        Name: 'email',
        Value: email,
    };
    var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);
  
    attributelist.push(attributeemail);
    
    var pwd2 = pwd;
    var hash = sha256(pwd2);
    console.log(attributelist);
  
    cognito.signUp(user, hash , attributelist, null, async (err, data) => {
        if (err) {
            console.log("no se registro");
           return false
        }
        
    });
    console.log("SI se registro");
    return true
  }
  
  /*
  // dentro de lo que mandan a llamar al registrar mandar a llamar
  await registroCognito(fullname,user,email,pass).then(async(cog)=> {
  
    if (cog) {
      // es true que es lo que va a realizar
    }
    else {
      // de ser falso que es lo que realiza
    }
  
  });


*/


appLogin2.get('/COG', function (req, res ) {
    console.log ("confirmacion de peticion a cognito");
	res.status(200).json([]);
});




//
appLogin2.post("/api/login", async (req, res) => {
   
    var pwd = req.body.password;
    var hash = sha256(pwd);

    var authenticationData = {
      Username: req.body.username,
      Password: hash 
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    var userData = {
      Username: req.body.username,
      Pool: cognito,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        // User authentication was successful
        console.log("si sos vos")
        res.json(result); //
      },
      onFailure: function (err) {
        // User authentication was not successful
        console.log("No sos vos")
        res.json(err);
      },
      mfaRequired: function (codeDeliveryDetails) {
        // MFA is required to complete user authentication.
        // Get the code from user and call
        cognitoUser.sendMFACode(verificationCode, this);
      },
    });
  });
//




// FUNCION PARA LOGIN CON CONGNITO
export const loginCognito = async (user, pwd ,result2 ,response) => {
   
    var pwd2 = pwd;
    var hash = sha256(pwd2);

    var authenticationData = {
      Username: user,
      Password: hash 
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    var userData = {
      Username: user,
      Pool: cognito,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        // User authentication was successful
        console.log("si sos vos")
        console.log(result2[0]);
        response.status(200).send(result2[0]);
        //res.json(result); 
      },
      onFailure: function (err) {
        // User authentication was not successful
        console.log("No sos vos")
        response.status(502).send('Status: false');
        //res.json(err);
      },
      mfaRequired: function (codeDeliveryDetails) {
        // MFA is required to complete user authentication.
        // Get the code from user and call
        cognitoUser.sendMFACode(verificationCode, this);
      },
    });
  };



/*
// LOGIN CON COGNITO

appLogin2.post("/api/login", async (req, res) => {
    //var email = req.body.email;
    var pwd = req.body.password;

    var hash = sha256(pwd);

  var authenticationData = {
      Username: req.body.username,
      password: hash
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
  );
  var userData = {
      Username: req.body.username,
      Pool: cognito,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          // ingresar al usuario si las credensiales son correctas
          console.log("si se autentifico");
          res.status(200).json(result); //
      },
      onFailure: function (err) {
        console.log("NO se autentifico");
          // cuando no lo son regresar a intentar de nuevo
          res.status(502).json(err);
      },
      mfaRequired: function (codeDeliveryDetails) {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          cognitoUser.sendMFACode(verificationCode, this);
      },
  });
});

*/

  //##############################################################3
  //Amazon Cognito


  
  appLogin2.post("/signup", async (req, res) => {

    var attributelist = [];
    var dataname = {
        Name: 'name',
        Value: req.body.name,
    };
    var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);
  
    attributelist.push(attributename);
  
    var dataemail = {
        Name: 'email',
        Value: req.body.email,
    };
    var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);
  
    attributelist.push(attributeemail);
    
    var pwd = req.body.password;
    var hash = sha256(pwd);
    console.log(attributelist);
    
    cognito.signUp(req.body.username, hash , attributelist, null, async (err, data) => {
        
        if (err) {
            console.log(err);
            console.log("error de registro");
            res.json(err.message || err);
            return;
        }
        console.log(data);
        res.json(req.body.username+ ' registrado');
    });
    });









    export default appLogin2