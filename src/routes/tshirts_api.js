const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { models } = require('../libs/sequelize.js');
const Joi = require('joi');
const { tshirtSchema } = require('../libs/validationSchemas.js');

// Listar camisetas
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let tshirts;

        if (search) {
            tshirts = await models.Tshirt.findAll({
                where: {
                    name: {
                        [models.Sequelize.Op.iLike]: `%${search}%`,
                    },
                },
            });
        } else {
            tshirts = await models.Tshirt.findAll();
        }

        res.json(tshirts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener las camisetas" });
    }
});

// Crear camisetas
router.post("/", async (req, res) => {
    try {
        const { error, value } = tshirtSchema.validate(req.body);

        if (error) {
            console.error(error.details);
            return res.status(400).json({ message: "Error de validación en los datos de la camiseta", details: error.details });
        }

        const newTshirt = value;
        newTshirt.id = uuidv4();

        const createdTshirt = await models.Tshirt.create(newTshirt);
        res.json({ message: "La camiseta fue creada con éxito", tshirt: createdTshirt });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al crear la camiseta" });
    }
});

// Obtener una sola camiseta
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const tshirtFound = await models.Tshirt.findByPk(id);

        if (!tshirtFound) {
            res.status(404).json({ ok: false, message: "Camiseta no encontrada" });
            return;
        }

        res.json({ ok: true, tshirt: tshirtFound });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener la camiseta" });
    }
});

// Actualizar una camiseta
router.put("/:id", async (req, res) => {
    try {
        const { error, value } = tshirtSchema.validate(req.body);

        if (error) {
            console.error(error.details);
            return res.status(400).json({ message: "Error de validación en los datos de la camiseta", details: error.details });
        }

        const id = req.params.id;
        const [updatedRowCount, updatedTshirt] = await models.Tshirt.update(value, {
            where: { id: id },
            returning: true,
        });

        if (updatedRowCount === 0) {
            res.status(404).json({ ok: false, message: "Camiseta no encontrada" });
            return;
        }

        res.json({ ok: true, tshirt: updatedTshirt[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar la camiseta" });
    }
});

// Eliminar una camiseta
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRowCount = await models.Tshirt.destroy({
            where: { id: id },
        });

        if (deletedRowCount === 0) {
            res.status(404).json({ ok: false, message: "Camiseta no encontrada" });
            return;
        }

        res.json({ ok: true, tshirt: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar la camiseta" });
    }
});

module.exports = router;
