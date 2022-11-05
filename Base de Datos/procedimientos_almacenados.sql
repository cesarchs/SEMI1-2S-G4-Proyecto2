use proyecto2;
-- --------------------------------------------------------------
-- CONSULTA PARA INSERTAR USUARIO
-- --------------------------------------------------------------
DELIMITER @@
CREATE PROCEDURE insertarUsuario(
    fullname varchar(255),
    user varchar(50),
    pwd varchar(100),
    email varchar(100),
    foto varchar(255),
    modoBot varchar(100))
BEGIN
    INSERT INTO USUARIO(fullname, user, email, pwd, photo, modoBot)
	VALUES(fullname,user,pwd,email,foto,'Desactivado');
END @@
call insertarUsuario('minerva7 suarez','mine7', 'minerva7@gmail.com', "1234", 'PHOTOMINERVA7','DESACTIVADO');
-- ---------------------------------------------------------------
-- CONSULTA pARA ACTUALIZAR USUARIO
-- ---------------------------------------------------------------
-- drop procedure actualizarUsuario
DELIMITER @@
CREATE PROCEDURE actualizarUsuario(
	idUsuario int,
    fullname varchar(255),
    usernuevo varchar(50),
    email varchar(100),
    pwd varchar(100),
    foto varchar(255),
    modoBot varchar(100))
BEGIN
    UPDATE USUARIO 
    SET fullname = fullname, user = usernuevo, email = email, pwd = pwd, photo = foto, modoBot = modoBot
    WHERE idUsuario = idUsuario;
END @@
SET SQL_SAFE_UPDATES = 0;
select *from USUARIO;

select * from USUARIO where user = "MINERVACAMBIO";
select  @@ collation_Proyecto2;
-- ----------------------------------------------------------
-- Llamando al Procedimiento almacenado
CALL actualizarUsuario(2,"MINERVACAMBIO62","MINERVACAMBIO","MINERVACAMBIO@gmail.com","1234","MINERVACAMBIOFOTO","Desactivado");
-- ---------------------------------------------------------------
-- CONSULTA pARA VERIFICAR QUE EL USUARIO Y EMAIL YA ESTEN INGRESADOS
-- ---------------------------------------------------------------
SELECT *FROM USUARIO  WHERE (user = 'mine' AND pwd = "123") or (email = 'mine@gmail.com' AND pwd = "123");
-- ---------------------------------------------------------------
-- CONSULTA VER TODOS LOS USUARIOS pARA AGREGAR CUANDO ESTAN EN LA TABLA AMIGOS
-- ---------------------------------------------------------------
drop procedure agregarAmigos
DELIMITER @@
CREATE PROCEDURE agregarAmigos(
	idUsuarioSet int )
BEGIN 
	SELECT aux.IdUsuario IdUsuario, aux.fullname Nombre, aux.user Usuario, aux.email Email, aux.photo FotoPerfil
	FROM (
		SELECT u.idUsuario, u.fullname, u.user, u.email, u.photo
		FROM USUARIO u
			LEFT JOIN Amigos a ON u.idUsuario = a.idAmigo1 or u.idUsuario = a.idAmigo2
			WHERE u.idUsuario <> idUsuarioSet 
			GROUP BY u.idUsuario, u.user 
			ORDER BY u.idUsuario ASC
	) aux
	LEFT JOIN (SELECT idAmigo2 as idUsuario FROM Amigos where idAmigo1 = idUsuarioSet ) aux1 ON aux.idUsuario = aux1.idUsuario 
	LEFT JOIN (SELECT idAmigo1 as idUsuario FROM Amigos where idAmigo2 = idUsuarioSet ) aux2 ON aux.idUsuario = aux2.idUsuario
	WHERE aux1.idUsuario is NULL and aux2.idUsuario is NULL 
	ORDER BY aux.user ASC ;
END @@
-- ----------------------------------------------------------
-- Llamando al Procedimiento almacenado de agregar amigos
CALL agregarAmigos(2);
-- ---------------------------------------------------------------
-- CONSULTA VER TODOS LOS USUARIOS QUE NO TIENEN NINGUN AMIGO
-- ---------------------------------------------------------------
Select u.idUsuario, u.fullname, u.user, u.email, u.photo
from USUARIO u
	left join Amigos a on u.idusuario = a.idAmigo1 or u.idusuario = a.idAmigo2 
    where a.idAmigo1 is null and a.idAmigo2 is null
-- ------------------------------------------------------------------
-- CONSULTAR DE VER SOLICITUDES QUE SON ACEpTADAS
-- -----------------------------------------------------------------
drop procedure solicitudesAceptadasRechazadasPendientes
DELIMITER @@
CREATE PROCEDURE solicitudesAceptadasRechazadasPendientes (
	idUsuarioAceptado int,
    idTipoSolicitud int
)
BEGIN
	SELECT  aux.idUsuario IdUsuario, aux.user Usuario, aux.photo Fotografia, aux.tipoSolicitud TipoSolicitud, aux.fechaAmistad FechaAmistad
	FROM (
			SELECT  u.idUsuario , u.user , u.photo , ts.tipoSolicitud, a.fechaAmistad
			FROM USUARIO u
			INNER JOIN Amigos a ON u.idUsuario = a.idAmigo1 or u.idUsuario = a.idAmigo2
			INNER JOIN Tipo_Solicitud ts ON a.idTipo_Solicitud = ts.idTipo_Solicitud 
			WHERE a.idAmigo1 = idUsuarioAceptado or a.idAmigo2 = idUsuarioAceptado
	) aux
	INNER JOIN(
			(SELECT idAmigo2 as idUsuario FROM Amigos where idAmigo1 = idUsuarioAceptado and idTipo_Solicitud = idTipoSolicitud)
			UNION
			(SELECT idAmigo1 as idUsuario FROM Amigos where idAmigo2 = idUsuarioAceptado and idTipo_Solicitud = idTipoSolicitud)
			) aux1 ON aux.idUsuario = aux1.idUsuario
	ORDER BY aux.user ASC;
END @@
SELECT *FROM Amigos
-- ---------------------------------------------------------------------
-- Llamando al procedimiento almacenado de solictudes con estado Aceptado
-- ---------------------------------------------------------------------
CALL solicitudesAceptadasRechazadasPendientes(2,2); 
-- DONDE EL SEGUNDO VALOR ES EL ESTADO  DE LA SOLICITUD DONDE : 1 ES ACEpTAR , EL ESTADO 2 ES RECHAZAR , EL ESTADO 3 ES pENDIENTE
-- ---------------------------------------------------------------------
-- CONSULTA PARA CREAR PUBLICACIONES
-- ---------------------------------------------------------------------
drop procedure insertarPublicaciones
DELIMITER @@
CREATE PROCEDURE insertarPublicaciones( 
	descripcion varchar(500),
	idTipo_Publicacion int,
	idUsuario int,
    fechaPublicacion timestamp,
	etiqueta varchar(500) ,
	url varchar(500)
)
BEGIN
	INSERT INTO Publicaciones(descripcion,idTipo_Publicacion,idUsuario,fechaPublicacion,etiqueta,url)
	VALUES (descripcion,idTipo_Publicacion,idUsuario,now(),etiqueta,url);
END @@
-- -----------------------------------------------------------------------------
-- LLAMANDO EL procedimiento ALMACENADO para INSERTAR publicaciones\
-- ----------------------------------------------------------------------------
CALL insertarPublicaciones("Esto es una nueva descripcion",1,7,NOW(),"ETIQUETA ApI REKOGNITION","URL_pUBLICACION1");
-- ---------------------------------------------------------------------------
--  CONSULTA VER publicaciones DE AMIGOS YA SEA pUBLICA O pRIVADA
-- ---------------------------------------------------------------------------
drop procedure PublicacionesAmigos
DELIMITER @@
CREATE PROCEDURE PublicacionesAmigos( 
	idUsuario int 
)
BEGIN
	SELECT aux.idUsuario ,aux.user, aux.idTipo_Publicacion , aux.descripcion , aux.url, aux.fechaPublicacion
	FROM (
			SELECT u.idUsuario ,u.user, p.idTipo_Publicacion , p.descripcion , p.url, p.fechaPublicacion
			FROM USUARIO u 
			LEFT JOIN Publicaciones p ON p.idUsuario = u.idUsuario
			WHERE u.idUsuario = 2
			-- GROUP BY p.descripcion
			-- ORDER BY p.fechaPublicacion DESC
		) aux
	LEFT JOIN(
			(SELECT idAmigo2 as idUsuario FROM Amigos where idAmigo1 = 2 and idTipo_Solicitud = 1)
			UNION
			(SELECT idAmigo1 as idUsuario FROM Amigos where idAmigo2 = 2 and idTipo_Solicitud = 1)
		) aux1  ON aux.idUsuario = aux1.idUsuario
	ORDER BY aux.fechaPublicacion DESC;
END @@
CALL PublicacionesAmigos(2);
-- ---------------------------------------------------------------------------
--  CONSULTA PARA VER MIS PUBLICACIONES
-- ---------------------------------------------------------------------------
DELIMITER @@
CREATE PROCEDURE misPublicaciones( 
	idUsuario int 
)
BEGIN
	SELECT aux.idUsuario ,aux.user, aux.idTipo_Publicacion , aux.descripcion , aux.url, aux.fechaPublicacion
	FROM (
			SELECT u.idUsuario ,u.user, p.idTipo_Publicacion , p.descripcion , p.url, p.fechaPublicacion
			FROM USUARIO u 
			LEFT JOIN Publicaciones p ON p.idUsuario = u.idUsuario
			WHERE u.idUsuario = idUsuario
			-- GROUP BY p.descripcion
			-- ORDER BY p.fechaPublicacion DESC
		) aux
	LEFT JOIN(
			(SELECT idAmigo2 as idUsuario FROM Amigos where idAmigo1 = idUsuario and idTipo_Solicitud = 1)
			UNION
			(SELECT idAmigo1 as idUsuario FROM Amigos where idAmigo2 = idUsuario and idTipo_Solicitud = 1)
		) aux1  ON aux.idUsuario = aux1.idUsuario
	ORDER BY aux.fechaPublicacion DESC;
END @@
CALL misPublicaciones(2);
-- ----------------------------------------------------------------------------
-- CONSULTA DE INSERT DE SALA (BOTON QUE DIGA IR A CHAT DEL AMIGO SELECCIONADO )
-- ----------------------------------------------------------------------------
drop procedure insertarSalaPrivadaGrupal
DELIMITER @@
CREATE PROCEDURE insertarSalaPrivadaGrupal(
idtipo_Sala int)
BEGIN
	INSERT INTO Sala(idtipo_Sala)
	VALUES(idtipo_Sala);
END @@
-- -----------------------------------------------------------------------------
-- Llamamdo al Procedimiento almacenado de insertando sala amigo a amigo
call insertarSalaPrivadaGrupal(2); -- cuando es de amigo a amigo el chat siemPre sera Privado (2) (BOTON QUE DIGA IR A CHAT DEL AMIGO SELECCIONADO 
call insertarSalaPrivadaGrupal(1); -- cuando es Grupal el chat siemPre sera Grupal (1) (BOTON QUE DIGA CREAR GrupO )
-- ----------------------------------------------------------------------------
-- EN EL MISMO BOTON DE IR A CHAT SE DEBE DE CREAR LA TABLA USUARIO SALA del usuario loguaed0
-- ----------------------------------------------------------------------------
drop procedure insertarSalaUsuario
DELIMITER @@
CREATE PROCEDURE insertarSalaUsuario(
idSala int,
idUsuarioLogueado int)
BEGIN
	INSERT INTO Sala_Usuario(idSala,idUsuario)
	VALUES(idSala,idUsuarioLogueado);
END @@
call insertarSalaUsuario(); 
-- ----------------------------------------------------------------------------
-- EN EL MISMO BOTON DE IR A CHAT SE DEBE DE CREAR LA TABLA USUARIO SALA del usuario ingresado
-- ----------------------------------------------------------------------------
drop procedure insertarSalaUsuarioAmigo
DELIMITER @@
CREATE PROCEDURE insertarSalaUsuarioAmigo(
idSala int,
idUsuarioAmigo int)
BEGIN
	INSERT INTO Sala_Usuario(idSala,idUsuario)
	VALUES(idSala,idUsuarioAmigo);
END @@
call insertarSalaUsuarioAmigo(); 
-- --------------------------------------------------------------------------------------
-- consulta de mensajes en chats 
-- --------------------------------------------------------------------------------------









CALL actualizarUsuario(1,"minerva8Suarez", "mine8", "mine8@gmail.com", "1234", "fotografiaMINERVA8","Desactivado")
CALL actualizarUsuario(1,"minerva8Suarez", "mine8", "mine8@gmail.com", "1234", "fotografiaMINERVA8","Desactivado")
