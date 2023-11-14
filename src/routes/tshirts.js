require("dotenv").config();
const fs = require("fs"); //importamos el modulo de node para trabajar con archivos (file system)
const { v4: uuidv4 } = require("uuid"); //importamos el modulo de node para generar ids unicos

//modulos internos
const { readFile, writeFile } = require("../files.js");
const { route } = require("./tshirts_api.js");
const {models} = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { Op } = require('sequelize');


const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";
const FILE_NAME = "./db/tshirts.txt";

//usar el motor de plantillas ejs
// Por estas líneas:
const express = require("express");
const router2 = express.Router(); // Cambia "express.router2" a "express.Router()"
const { tshirtSchema } = require('../libs/validationSchemas.js');


//Rutas, está el / que es la raiz... entonces podemos controlar la URI (ejemplo: hola depues del /)
//los path params son obligatorios y solo el desarrollador conoce la clave

//query params: http://localhost:3000/hola/victor?type=Efusivo&formal=true

//RUTA DE PRUEBA
//RUTA DE PRUEBA
// router2.get("/hola/:name", (req, res) => {
//     console.log(req);
//     const name = req.params.name;
//     const type = req.query.type;
//     const formal = req.query.formal;
//     const students_list = ["Carlos", "Victor", "Juan", "Pedro"];
//     // res.send(`Hello ${formal ? "Mr." : ""}
//     //   ${name} ${type ? " " + type : ""}`); //utiliza el ternario para saber si es formal o no
//     res.render("index", {
//         name: name,
//         students: students_list,
//     }); //enviar datos a la vista
// });

router2.get("/api/read-file", (req, res) => {
    const data = readFile(FILE_NAME);
    res.send(data);
});

//WEB
//Listar Mascotas
router2.get("/", async (req, res) => {
    const { search } = req.query;
    let tshirts;

    if (search) {
        // Si hay un parámetro de búsqueda, realiza una búsqueda parcial en las columnas relevantes
        tshirts = await models.Tshirt.findAll({
            where: {
                [Op.or]: [
                    sequelize.literal(`LOWER("color") LIKE LOWER('%${search}%')`),
                    sequelize.literal(`LOWER("tipo") LIKE LOWER('%${search}%')`),
                    // Añade otras columnas relevantes aquí
                ],
            },
        });
    } else {
        tshirts = await models.Tshirt.findAll();
    }
    res.render('tshirts/index', { tshirts: tshirts, search: search });
});

//Crear Mascotas
router2.get("/create", (req, res) => {
    res.render("tshirts/create");
});

router2.post("/", async (req, res) => {
    try {
        const { error, value } = tshirtSchema.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const newTshirt = await models.Tshirt.create(req.body);
        res.redirect('/tshirts');
    } catch (err) {
        console.error(err);
        res.json({ message: "Error al crear la camiseta" });
    }
});


//Eliminar una macota
router2.post("/delete/:id", (req, res) => {
    //:id porque es un parametro
    console.log(req.params.id);
    //Guardamos el id que viene en la url
    const id = req.params.id;
    //leer el archivo de mascotas
   // const pets = readFile(FILE_NAME);
   // //buscar la mascota con el id que recibimos
   // const petIndex = pets.findIndex((pet) => pet.id === id);
   // if (petIndex < 0) {
   //     res.status(404).json({ ok: false, message: "Pet not found" });
   //     return;
   // }
   // //Eliminar la mascota que esté en la posicion petIndex
   // pets.splice(petIndex, 1);

    //writeFile(FILE_NAME, pets);
    models.Tshirt.destroy({
        where: {
            id: id
        }
    })
    res.redirect("/tshirts");
});

module.exports = router2;