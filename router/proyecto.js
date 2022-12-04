const {Router} = require ('express');
const Proyecto = require ('../models/Proyecto');
const { validarProyecto } = require('../helpers/validar-proyectos');

const router = Router();

//crear un proyecto
router.post('/', async function (req, res){
    try{
        console.log('Ambiente:', process.env.CONTAINER_HOST)
        const validaciones = validarProyecto(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeProyectoPorNumero = await Proyecto.findOne( {numero: req.body.numero});
        if(existeProyectoPorNumero){
            return res.send('Ya existe este numero para este proyecto').status(400);
        }

        let proyecto = new Proyecto();
        proyecto.serial = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._Id;
        proyecto.etapa = req.body.etapa._Id;
        proyecto.tipoProyecto = req.body.tipoProyecto._Id;
        proyecto.universidad = req.body.universidad._Id;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();

        res.send(proyecto);
    }catch(error){
        console.log(Error);
        res.status(500).send('Ocurrio un error al crear un proyecto');
    }
});
//Actualizar un proyecto
router.put ('/:proyectoId', async function(req, res){
    try{
        let proyecto = await Proyecto.findById(req.params.inventarioId);
        if(!proyecto){
            return res.status(400).send('proyecto no existe');
        }

        const existeProyectoPorNumero = await Proyecto
                             .findOne( {numero: req.body.numero, _id:{ $ne: proyecto._id }});
        if(existeProyectoPorNumero){
            return res.status(400).send('Ya existe el numero para otro proyecto');
        }

    
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._Id;
        proyecto.etapa = req.body.etapa._Id;
        proyecto.tipoProyecto = req.body.tipoProyecto._Id;
        proyecto.universidad = req.body.universidad._Id;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();

        res.send(proyecto);
    }catch(error){
        console.log(Error);
        res.status(500).send('Ocurrio un error al consultar proyecto');
    }
});

module.exports = router;