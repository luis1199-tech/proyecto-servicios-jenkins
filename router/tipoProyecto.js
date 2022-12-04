const {Router} = require ('express');
const TipoProyecto = require('../models/TipoProyecto');
const {validationResult, check} = require ('express-validator');//validar campo put y post

const router = Router();

//listar estados de equipo

router.get('/', async function(req, res){
    try{
        const tipos = await TipoProyecto.find();
        res.send(tipos);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')

    }
    
});

//crear un estado de equipo

router.post('/', 

[
    check('nombre', 'nombre.requerido').isIn(['Ensayo', 'Artículo', 'Monografia', 'Trabajo final de pregrado', 'Trabajo final de especialización',]),
],

async function(req, res){
    try{
        const errors = validationResult (req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array()});
        }

        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre =req.body.nombre;
        tipoProyecto.fechaCreacion = new Date();
        tipoProyecto.fechaActualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);


    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');

    }

});

//Actualizar un tipo de proyecto

router.put ('/:tipoProyectoId', 
    
[
    check('nombre', 'nombre.requerido').isIn(['Ensayo', 'Artículo', 'Monografia', 'Trabajo final de pregrado', 'Trabajo final de especialización',]),
],
    async function(req, res){
    try{
        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId);
        if (!tipoProyecto){
            return res.send('No existe Proyecto');
        }
        const errors = validationResult (req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array()});
        }    

        tipoProyecto.nombre =req.body.nombre;
        tipoProyecto.fechaCreacion = new Date();
        tipoProyecto.fechaActualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);


    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
    
});

module.exports = router;