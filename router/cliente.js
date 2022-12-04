const { Router } = require('express');
const {validationResult, check} = require ('express-validator');
const router = Router();
const Cliente = require('../models/Cliente');


router.post('/', 
[
          check('nombre','nombre.requerido').not().isEmpty(),
          check('email','email.requerido').isEmail(),
],

async function(req, res){
    try {
    console.log('objeto recibido', req.body);

    const existeCliente = await Cliente.findOne({email: req.body.email});
    console.log('Respuesta existe usuario', existeCliente);
    if(existeCliente){
        return res.send('Email ya existe');
    }

    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ messages: errors.array()});
    }
    
    let cliente = new Cliente();
    cliente.nombre = req.body.nombre;
    cliente.email = req.body.email;
    cliente.fechaCreacion = new Date();
    cliente.fechaActualizacion = new Date();

    cliente = await cliente.save();

    res.send(cliente);

    }catch (error){
        console.log(error);
        res.send('ocurrio un error');
    }

});

router.get('/', async function(req, res){
    try{
        const clientes = await Cliente.find();
        res.send(clientes);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.put('/:clienteId', 
    [
        check('nombre','nombre.requerido').not().isEmpty(),
        check('email','email.requerido').isEmail(),
    ],

    async function(req, res){
    try {
        console.log('objeto recibido', req.body, req.params);

        let cliente = await Cliente.findById(req.params.clienteId);

        if(!cliente){
            return res.send('Cliente no existe');
        }

        const existeCliente = await Cliente
                   .findOne({email: req.body.email, _id: { $ne: cliente._id }});
        console.log('Respuesta existe cliente', existeCliente);

        if(existeCliente){
            return res.send('Email ya existe');
        }

        const errors = validationResult (req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ messages: errors.array()});
        }

        cliente.email = req.body.email;
        cliente.nombre = req.body.nombre;
        cliente.fechaActualizacion = new Date();
    

        cliente = await cliente.save();
    
        res.send(cliente);
    
        }catch (error){
            console.log(error);
            res.send('ocurrio un error');
        }
});

module.exports = router;

