INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva1 suarez','mine1', 'minerva1@gmail.com', "1234", 'PHOTOMINERVA1','DESACTIVADO');
INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva2 suarez','mine2', 'minerva2@gmail.com', "1234", 'PHOTOMINERVA2','DESACTIVADO');
INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva3 suarez','mine3', 'minerva3@gmail.com', "1234", 'PHOTOMINERVA3','DESACTIVADO');
INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva4 suarez','mine4', 'minerva4@gmail.com', "1234", 'PHOTOMINERVA4','DESACTIVADO');
INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva5 suarez','mine5', 'minerva5@gmail.com', "1234", 'PHOTOMINERVA5','DESACTIVADO');
INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
VALUES('minerva8 suarez','mine8', 'minerva8@gmail.com', "1234", 'PHOTOMINERVA8','DESACTIVADO');
SELECT *FROM USUARIO;
-- ---------------------------------------------------
-- INSERTANDO DATOS EN LA TABLA DE TIpO DE SOLICITUD
-- ---------------------------------------------------
INSERT INTO Tipo_Solicitud(tipoSolicitud)
VALUES("ACEpTAR");
INSERT INTO Tipo_Solicitud(tipoSolicitud)
VALUES("Rechazar");
INSERT INTO Tipo_Solicitud(tipoSolicitud)
VALUES("Pendiente");
Select *from Tipo_Solicitud ;
-- ---------------------------------------------------
-- INSERTANDO AMIGOS
-- ---------------------------------------------------
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(1,2,now(),1);
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(1,3,now(),1);
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(2,3,now(),1);
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(3,4,now(),1);
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(5,2,now(),1);
INSERT INTO Amigos (idAmigo1, idAmigo2,fechaAmistad,idTipo_Solicitud)
VALUES(6,2,now(),2);
select *from Amigos;
-- ----------------------------------------------------
-- INSERTANDO TIPOS DE PUBLICACIONES
-- ---------------------------------------------------
INSERT INTO Tipo_Publicacion(tipoPublicacion)
VALUES("Publico");
INSERT INTO Tipo_Publicacion(tipoPublicacion)
VALUES("Privado");
select *from Tipo_Publicacion;
-- -----------------------------------------------------
-- INSERTANDO pUBLICACIONES
-- ----------------------------------------------------
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION1',1,2,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION1");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION2',2,2,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION2");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION3',1,1,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION3");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION4',1,1,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION4");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION5',1,3,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION5");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION6',2,3,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION6");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION7',1,4,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION7");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION8',1,5,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION8");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION9',2,8,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION9");
INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
VALUES ('descripcionpUBLICACION10',2,6,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION10");
SELECT *FROM Publicaciones;
-- ----------------------------------------------------------
-- INSERT DE TIpO DE CHAT
-- ------------------------------------------------------------
INSERT INTO Tipo_Sala(tipoSala)
VALUES("Grupo");
INSERT INTO Tipo_Sala(tipoSala)
VALUES("Privado");
select *from Tipo_Sala;
-- ------------------------------------------------------------
-- INSERT DE sala
-- -------------------------------------------------------------
INSERT INTO Sala(idtipo_Sala)
VALUES(1);
INSERT INTO Sala(idtipo_Sala)
VALUES(1);
INSERT INTO Sala(idtipo_Sala)
VALUES(2);
INSERT INTO Sala(idtipo_Sala)
VALUES(2);
select *from Sala;
-- ---------------------------------------------------------------
-- insertando sala con usuario 
-- ---------------------------------------------------------------
INSERT INTO Sala_Usuario(idSala,idUsuario)
VALUES(1,1);
INSERT INTO Sala_Usuario(idSala,idUsuario)
VALUES(3,1);
INSERT INTO Sala_Usuario(idSala,idUsuario)
VALUES(3,3);
INSERT INTO Sala_Usuario(idSala,idUsuario)
VALUES(3,4);
INSERT INTO Sala_Usuario(idSala,idUsuario)
VALUES(1,6);
select *from Sala_Usuario;
-- --------------------------------------------------
-- chat 
-- --------------------------------------------------
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(1,1,"Hola como estas",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(1,6,"Muy bien gracias, que tal estas tu",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,1,"Bienvenidos al grupo Familia",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,4,"Gracias por la Invitacion usuario 1",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,6,"yo no queria estar aqui, no me inviten",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,1,"usuario 7, esa actitud que fea es ",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,6,"que te valga madres mi actitud",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,3,"que paso de que me perdi",now(),"imagen");
INSERT INTO Chat(idSala,idUsuario,descripcion,fecha,url)
VALUES(3,4,"de nada bueno, estos burros que solo mates son",now(),"imagen");

select *from Chat where idSala = 3;
