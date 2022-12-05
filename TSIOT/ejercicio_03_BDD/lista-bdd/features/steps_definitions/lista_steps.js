const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('chai').assert;
const Lista = require("../../../../ejercicio_01_TDD/src/lista.js")

var lista;

Given('una lista vacia', function () {
    lista = new Lista();
});

Given('una lista con los siguientes elementos', function (elementos) {
    lista = new Lista();
    elementos.rawTable.forEach(pareja => 
        lista.add(pareja[0], pareja[1]));
});

When('se agrega la clave {string} con el valor {}', function (clave, valor) {
    lista.add(clave, valor);
});

When('se busca la clave {string}', function (clave) {
    resultado = lista.find(clave);
});

Then('la lista tiene {int} elemento(s) almacenado(s)', function (cantidad) {
    assert.equal(lista.count(), cantidad);
});

Then('se obtiene el valor {}', function (valor) {
    assert.equal(resultado, valor);
});