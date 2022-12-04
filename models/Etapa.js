const {Schema, model} = require ('mongoose');

const EtapaSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        enum:[ 'Anteproyecto', 'Entrega parcial 1', 
          'Entrega parcial 2', 'Entrega final']
    },

    fechaCreacion:{
        type:Date,
        required: true,
    },
    fechaActualizacion:{
        type: Date,
        required: true,
    }

});

module.exports = model ('Etapa', EtapaSchema );