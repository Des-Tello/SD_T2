const validarParametros = (parametros) => {
    for(parametro of parametros) {
        if(parametro.replaceAll(" ", "") == "") {
            return false;
        }
    }
    return true;
}

const validarRut = (rut) => {
    rut = rut.replaceAll(".", "").replaceAll("-", "");
    if(rut.length >= 8) {
        return rut;
    }
    else {
        return false;
    }
}

module.exports = {validarParametros, validarRut};