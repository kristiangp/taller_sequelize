//npm init antes de hacer cualquier cosa

//vamos ausar nodemon para que se actualice automaticamente el servidor
// instalar nodemon de manera global: npm i -g nodemon
//instalamos nodemosn al proyecto: npm i -D nodemon (la D es para que sea de desarrollo), en produccion no se usa
//para ejecutar nodemon: npx nodemon index.js

//*****    */

//sobre node vamos a colocar un framework que se llama express, tmabien existen koa, hapi, etc
//instalamos express: npm i express

//request tiene: tipo de peticion, url, headers, body, etc
//peticiones de tipo get: se envian por la url, sirve para obtener informacion
//peticiones de tipo post: se envian por el body, sirve para crear informacion
//peticiones de tipo put: se envian por el body, sirve para actualizar informacion
//peticiones de tipo delete: se envian por el body, sirve para eliminar informacion
//peticones de tipo patch: se envian por el body, sirve para actualizar informacion

//http(s)://dominio.com:puerto/persons/2?name='hola'
//protocolo: http o https
//dominio: no vemos el puerto, pero esta ahi
//URI: /persons/2 ... es la ruta QUE PUEDE Tener variables: path params... si está despues del ? son: query params

//header: son metadatos de la peticion, por ejemplo: el tipo de contenido que se esta enviando, el tipo de contenido que se esta recibiendo entre el cliente y el seridor
//body: es la informacion que se envia en la peticion, por ejemplo: cuando se envia un formulario, se envia la informacion en el body por medio de peticiones post, put, patch, delete

//librerias externas
require("dotenv").config();
const express = require("express");
const fs = require("fs"); // Importamos el módulo de node para trabajar con archivos (file system)
const { v4: uuidv4 } = require("uuid"); // Importamos el módulo de node para generar ids únicos

// Módulos internos
const { readFile, writeFile } = require("./src/files.js");
const tshirts_api = require('./src/routes/tshirts_api.js');
const tshirts = require('./src/routes/tshirts.js');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";
const FILE_NAME = "./db/tshirts.txt";

// Middleware
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

// Usar el motor de plantillas ejs
app.set("views", "./src/views"); // Para que ejs sepa dónde están las vistas
app.set("view engine", "ejs"); // Para usar ejs como motor de plantillas

// Rutas
app.use('/api/tshirts', tshirts_api);
app.use('/tshirts', tshirts);

app.listen(
    PORT,
    () => console.log(`${APP_NAME} is running on http://localhost:${PORT}`)
);

//postman: ... exportar coleccion de postman

//instalar dotenv: npm i dotenv
//crear archivo .env en la raiz del proyecto
//creamos archivo .env.example (para los que demás desarrolladores)
//importamos la libreria dotenv en el index.js al inicio de todo se importa asi: require('dotenv').config();
//const PORT = process.env.PORT || 3000; (pon esto en el index.js en los modulos internos)
// const APP_NAME = process.env.APP_NAME || 'My App'; (pon esto en el index.js en los modulos internos)
// app.listen(PORT, () =>
//   console.log(`${APP_NAME} is running on http://localhost:${PORT}`) //sirve para ver en que puerto esta corriendo el servidor
// );  (pones asi en el index, reemplazas el que había del puerto 3000 por este)
// pones /api antes de /pets en todos los get, post, delete, etc...

// -----EJS------ como motor de plantillas
//npm install ejs

//creamos la carpeta views dentro de src
//creamos el archivo index.ejs dentro de la carpeta views

//ponemos esto en el navegador y nos muestra lo que creamos en el index.ejs...... http://localhost:3000/hola/carlos