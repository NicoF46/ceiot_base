module.exports = class Lista {
    constructor() {
        this.elementos = [];
    }

    count(){
        return this.elementos.length;
    }

    add(clave, valor){
        if (typeof(clave) == 'string'){
            this.elementos.push({'clave': clave, 'valor': valor});
            console.log(this.elementos);

            return true;
        }
        else
            return false; 
    }

    find(clave){
        console.log(this.elementos);
        for (var indice = 0; indice < this.elementos.length; indice++) {
            if (this.elementos[indice].clave == clave){
                return this.elementos[indice].valor;
            }
        }
    }
};