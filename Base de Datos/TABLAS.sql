CREATE DATABASE PROYECTO2;
use Proyecto2;
-- ----------------------------------------------
-- AGREGAR USUARIO 
CREATE TABLE USUARIO(
	idUsuario INT PRIMARY KEY auto_increment,
    fullname VARCHAR(100) not null,
    user VARCHAR(20) unique,
    email VARCHAR(100) unique,
    pwd VARCHAR(100) not null,
    photo VARCHAR(100) not null,
    modoBot varchar(250)
) engine = innodb default charset = latin1;
-- ----------------------------------------------

CREATE TABLE Tipo_Sala (
	idTipo_Sala INT PRIMARY KEY auto_increment,
    tipoSala varchar(100)
);

CREATE TABLE Sala (
	idSala INT PRIMARY KEY auto_increment,
    idTipo_Sala int,
    
    CONSTRAINT FK_idTipoSala FOREIGN KEY(idTipo_Sala) REFERENCES Tipo_Sala(idTipo_Sala)
);

CREATE TABLE Sala_Usuario (
    idSala int,
    idUsuario int,
    
    CONSTRAINT PK_Sala_Usuario PRIMARY KEY(idSala, idUsuario),
    CONSTRAINT FK_idSala FOREIGN KEY(idSala) REFERENCES Sala(idSala),
    CONSTRAINT FK_idUsuario FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
);

CREATE TABLE Chat (
	idChat INT PRIMARY KEY auto_increment,
    idSala int,
    idUsuario int,
    descripcion varchar(500),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    url varchar(250),
    
	CONSTRAINT FK_idUsuarioChat FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario),
    CONSTRAINT FK_idSalaChat FOREIGN KEY(idSala) REFERENCES Sala(idSala)
);

CREATE TABLE Tipo_Solicitud (
	idTipo_Solicitud INT PRIMARY KEY auto_increment,
    tipoSolicitud varchar(100)
);

CREATE TABLE Amigos (
	idAmigo1 int,
    idAmigo2 int,
    fechaAmistad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    idTipo_Solicitud  int,
    
    CONSTRAINT PK_Amigos PRIMARY KEY(idAmigo1, idAmigo2),
    CONSTRAINT FK_idTipo_Solicitud FOREIGN KEY(idTipo_Solicitud) REFERENCES Tipo_Solicitud(idTipo_Solicitud),
    CONSTRAINT FK_idAmigo1 FOREIGN KEY(idAmigo1) REFERENCES USUARIO(idUsuario),
    CONSTRAINT FK_idAmigo2 FOREIGN KEY(idAmigo2) REFERENCES USUARIO(idUsuario)
);

CREATE TABLE Tipo_Publicacion (
	idTipo_Publicacion INT PRIMARY KEY auto_increment,
    tipoPublicacion varchar(100)
);

CREATE TABLE Publicaciones (
	idPublicacion INT PRIMARY KEY auto_increment,
    descripcion varchar(500),
	idTipo_Publicacion int,
	idUsuario int,
    etiqueta  varchar(500),
    fechaPublicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    url varchar(500),
    
    CONSTRAINT FK_idTipo_Publicacion FOREIGN KEY(idTipo_Publicacion) REFERENCES Tipo_Publicacion(idTipo_Publicacion),
    CONSTRAINT FK_idUsuarioPublicacion FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
);

drop table Publicaciones;
drop table Tipo_Publicacion;
drop table Amigos;
drop table Tipo_Solicitud;
drop table Chat;
drop table Sala_Usuario;
drop table Sala;
drop table Tipo_Sala;
drop table USUARIO;


