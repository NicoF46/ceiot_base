# language: es
# encoding: utf-8

Característica: Gestionar las parejas almacenadas en la lista

Escenario: Agregar un elemento a una lista vacia
    Dado una lista vacia
    Cuando se agrega la clave "clave" con el valor "valor"
    Entonces la lista tiene 1 elemento almacenado

Escenario: Agregar un elemento a una lista con elementos
    Dado una lista con los siguientes elementos
    | uno | 1 |
    Cuando se agrega la clave "dos" con el valor 2 
    Entonces la lista tiene 2 elementos almacenados

Escenario: Buscar el primer valor de una lista
    Dada una lista con los siguientes elementos
    | uno | 1 |
    | dos | 2 |
    | tres | 3 |
    Cuando se busca la clave "dos"
    Entonces se obtiene el valor 2

Esquema del escenario: Lista con varios elementos
    Dada una lista con los siguientes elementos
    | uno | 1 |
    | dos | 2 |
    | tres | 3 |
    Cuando se busca la clave <clave>
    Entonces se obtiene el valor <valor>
Ejemplos:
    | clave   | valor |
    |  "uno"  |   1   |
    |  "dos"  |   2   |
    |  "tres" |   3   |
