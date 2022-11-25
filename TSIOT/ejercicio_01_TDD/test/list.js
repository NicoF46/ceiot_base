const assert = require("chai").assert;
const Lista = require("../src/lista.js");

describe("cuando se crea una lista esta vacia", function() {
    var lista = new Lista();

    it("hay cero elementos", function() {
        assert.equal(lista.count(), 0);
    })
})

describe("cuando se agrega un nuevo elemento en la lista vacia", function() {
    var lista = new Lista();
    lista.add("clave", "valor");

    it("la cantidad de elementos es correcto", function() {
        assert.equal(lista.count(), 1);
    })

    it("el valor almacenado es el correcto", function() {
        assert.equal(lista.find("clave"), "valor");
    })

    describe("cuando se agrega un elemento invalido", function(){
        var lista = new Lista();

        describe("cuando la clave es un numero", function(){
            it("devuelve un error", function(){
                assert.isFalse(lista.add(1,1));
            })
    
            it("no se agregan nuevos elementos", function() {
                assert.equal(lista.count(), 0);
            })
        })
        describe("cuando la clave esta vacia", function(){
            it("devuelve un error", function(){
                assert.isFalse(lista.add(null,1));
            })
    
            it("no se agregan nuevos elementos", function() {
                assert.equal(lista.count(), 0);
            })
        })
    })
})

describe("cuando se agregan varios elementos distintos en la lista vacia", function() {
    var lista = new Lista();
    let cantidad_elementos = Math.floor(Math.random() * 10 + 1);
    for (let i = 0; i < cantidad_elementos; i++) {
        lista.add(`clave_${i}`, `valor_${i}`);
    } 
    
    it("hay cero elementos", function() {
        assert.equal(lista.count(), cantidad_elementos);
    })
})
