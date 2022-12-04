const {Schema,model} = require ('mongoose');


const ProyectoSchema = Schema ({
    numero:{
        type: Number,
        required:true,
        unique: true,
    },
    titulo:{
        type: String,
        required:true,

    },

    fechaIniciacion:{
        type: String,
        required:true,
    },
    fechaEntrega:{
        type: String,
        required:true,
        
    },
    valor:{
        type: Number,
        required:true,
    },

    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: false,
    },
    etapa:{
        type: Schema.Types.ObjectId,
        ref:'Etapa',
        required:true,
    },
    tipoProyecto:{
        type: Schema.Types.ObjectId,
        ref:'TipoProyecto',
        required:true,
    },
    universidad:{
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required:true,
    },
    fechaCreacion:{
        type: Date,
        required:true,
    },
    fechaActualizacion:{
        type: Date,
        required:true,
    }
});

module.exports = model ('Proyecto',ProyectoSchema);
