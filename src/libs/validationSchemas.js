const Joi = require('joi');

const tshirtSchema = Joi.object({
    color: Joi.string().valid('rojo', 'azul', 'verde').required(),
    talla: Joi.string().valid('S', 'M', 'L', 'XL').required(),
    tipo: Joi.string().valid('polo', 'manga corta', 'manga larga').required(),
    marca: Joi.string().required().min(2).max(50),
    precio: Joi.number().min(0).max(1000).required(),
    disponible: Joi.boolean().required(),
    stock: Joi.number().min(0).required(),
    fechaLanzamiento: Joi.date().iso().required(),
});
module.exports = {tshirtSchema};