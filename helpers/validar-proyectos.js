const validarProyecto = (req) => {
    const validaciones = [];
    if (!req.body.numero) {
        validaciones.push('Numero es requerido');
    }
    if (!req.body.titulo) {
        validaciones.push('Titulo es requerido');
    }
    if (!req.body.fechaIniciacion) {
        validaciones.push('Fecha iniciacion es requerido');
    }
    if (!req.body.fechaEntrega) {
        validaciones.push('Fecha de entrega es requerido');
    }
    if (!req.body.valor) {
        validaciones.push('Valor es requerido');
    }
    if (!req.body.cliente) {
        validaciones.push('Cliente es requerido');
    }
    if (!req.body.etapa) {
        validaciones.push('Etapa es requerido');
    }
    if (!req.body.universidad) {
        validaciones.push('Universidad es requerido');
    }
    if (!req.body.tipoProyecto) {
        validaciones.push('Tipo de proyecto es requerido');
    }
    return validaciones;
}

module.exports = {
    validarProyecto,
}