module.exports = class Lista {
    constructor() {
        this.elementos = [];
    }

    count() {
        return this.elementos.length;
    }

    indexOf(clave) {
        for (var indice = 0; indice < this.elementos.length; indice++) {
            if (this.elementos[indice].clave == clave) {
                return indice;
            }
        }
        return NaN;
    }

    add(clave, valor) {
        if (typeof (clave) != 'string') {
            return false;
        }
        else {
            if (!isNaN(this.indexOf(clave))) {
                return false;
            }
        }
        this.elementos.push({ 'clave': clave, 'valor': valor });
        return true;
    }


    find(clave) {
        var indice = this.indexOf(clave);
        if (!isNaN(indice)) {
            return this.elementos[indice].valor;
        }
    }

    remove(clave){
        var indice = this.indexOf(clave);
        if(!isNaN(indice)){
            this.elementos.splice(indice, 1);
            return true;
        }
        return false;
    }
};