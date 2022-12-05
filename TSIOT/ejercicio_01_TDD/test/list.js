const assert = require("chai").assert;
const Lista = require("../src/lista.js");

describe("cuando se crea una lista esta vacia", function () {
    var lista = new Lista();

    it("hay cero elementos", function () {
        assert.equal(lista.count(), 0);
    })
})

describe("cuando se agrega un nuevo elemento en la lista vacia", function () {
    let lista = new Lista();
    lista.add("clave", "valor");

    it("la cantidad de elementos es correcto", function () {
        assert.equal(lista.count(), 1);
    })

    it("el valor almacenado es el correcto", function () {
        assert.equal(lista.find("clave"), "valor");
    })

    describe("cuando se agrega un elemento invalido", function () {
        describe("cuando la clave es un numero", function () {
            let lista = new Lista();
            let cantidad_elementos = lista.count();
            
            it("devuelve un error", function () {
                assert.isFalse(lista.add(1, 1));
            })

            it("no se agregan nuevos elementos", function () {
                assert.equal(lista.count(), cantidad_elementos);
            })
        })

        describe("cuando la clave esta vacia", function () {
            let lista = new Lista();
            let cantidad_elementos = lista.count();
            it("devuelve un error", function () {
                assert.isFalse(lista.add(null, 1));
            })

            it("no se agregan nuevos elementos", function () {
                assert.equal(lista.count(), cantidad_elementos);
            })
        })

        describe("cuando la clave que se agrego ya existe en la lista", function () {
            let lista = new Lista();
            lista.add("clave", "valor")
            let cantidad_elementos = lista.count();
            it("devuelve un error", function () {
                assert.isFalse(lista.add("clave", "otro_valor"));
            })

            it("no se agregan nuevos elementos", function () {
                assert.equal(lista.count(), cantidad_elementos);
            })
        })
    })
})

describe("cuando se agregan varios elementos distintos en la lista vacia", function () {
    let lista = new Lista();
    let cantidad_elementos = Math.floor(Math.random() * 10 + 1);
    for (let i = 0; i < cantidad_elementos; i++) {
        lista.add(`clave_${i}`, `valor_${i}`);
    }

    it("la cantidad de lementos es la correcta", function () {
        assert.equal(lista.count(), cantidad_elementos);
    })
})

describe("cuando se borra un elemento", function () {
    describe("cuando el elemento existe", function () {
        let lista = new Lista();
        lista.add("clave_a_borrar", "valor");
        lista.add("otra_clave", "otra_valor");
        cantidad_elementos = lista.count();
        lista.remove("clave_a_borrar");

        it("no cambia la cantidad de elementos de la lista", function () {
            assert.equal(lista.count(), cantidad_elementos - 1);
        })

        it("el elemento no existe en la lista", function () {
            assert.equal(isNaN(lista.indexOf("clave_a_borrar")), true);
        })
    })

    describe("cuando el elemento no existe", function () {
        let lista = new Lista();
        lista.add("clave", "valor");

        it("devuelve un error", function () {
            assert.equal(lista.remove("clave_ausente"), false);
        })
    })
})