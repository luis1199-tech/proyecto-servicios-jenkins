const {Router} = require('express');
const {validationResult, check} = require ('express-validator');//validar campo put y post
const Etapa = require ('../models/Etapa')

const router = Router();

//listar etapas

router.get('/', async function(req,res){
    try {
        const etapa = await Etapa.find();
        res.send(etapa);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error')
    }
});

//crear una etapa

router.post('/', 

    [
        check('nombre','nombre.requerido').isIn(['Anteproyecto', 'Entrega parcial 1', 
        'Entrega parcial 2', 'Entrega final']),
    ],

    async function(req,res){
    try{
        
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ messages: errors.array()});
    }
        let etapa = new Etapa();
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date();
        etapa.fechaActualizacion = new Date();
        etapa = await etapa.save();
        res.send(etapa);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});
// actualizar etapas
router.put('/:etapaid', 
[
    check('nombre','nombre.requerido').isIn(['Anteproyecto', 'Entrega parcial 1', 
          'Entrega parcial 2', 'Entrega final']),
],
    async function(req,res){
    try{
        let etapa = await Etapa.findById(req.params.etapaId);
        if(!etapa){
            return res.send('Etapa no existe');
        }
        
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ messages: errors.array()});
    }

        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date();
        etapa.fechaActualizacion = new Date();
        etapa = await etapa.save();
        res.send(etapa);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
    
});

module.exports = router;