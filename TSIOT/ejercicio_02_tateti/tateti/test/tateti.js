let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Juego de tateti", () => {
    let juego = {
        jugadores: ['Juan', 'Pedro']
    }

    describe("Se empieza un nuevo juego", async () => {
        it("Todos los casilleros estan vacios", (done) => {
            chai.request(server)
                .put("/comenzar")
                .send(juego)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('tablero').eql([
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ]);
                    done()
                })
        })
    })

    describe("El primer jugador hace su primer movimiento", async () => {
        it("Se realizo correctamente la jugada en el tablero", (done) => {
            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 0, fila: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Pedro');
                    res.body.should.have.property('tablero').eql([
                        ['X', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ]);
                    done()
                })
        })
    })

    describe("El segundo jugador hace su primer movimiento", async () => {
        it("Se realizo correctamente la jugada en el tablero", (done) => {
            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 1, fila: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('tablero').eql([
                        ['X', 'O', ''],
                        ['', '', ''],
                        ['', '', '']
                    ]);
                    done()
                })
        })
    })
    describe("El primer jugador gana la partida", () => {
        describe("El primer jugador gana la partida con una columna con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 0, fila: 1 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 0, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[4])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Juan');
                        res.body.should.have.property('tablero').eql([
                            ['X', 'O', ''],
                            ['X', 'O', ''],
                            ['X', '', '']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con una fila con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 2, fila: 0 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[4])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Juan');
                        res.body.should.have.property('tablero').eql([
                            ['X', 'X', 'X'],
                            ['O', 'O', ''],
                            ['', '', '']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con la primer diagonal con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 1 },
                { jugador: 'Pedro', columna: 2, fila: 1 },
                { jugador: 'Juan', columna: 2, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[4])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Juan');
                        res.body.should.have.property('tablero').eql([
                            ['X', '', ''],
                            ['O', 'X', 'O'],
                            ['', '', 'X']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con la segunda diagonal con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 1 },
                { jugador: 'Pedro', columna: 2, fila: 1 },
                { jugador: 'Juan', columna: 0, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[4])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Juan');
                        res.body.should.have.property('tablero').eql([
                            ['', '', 'X'],
                            ['O', 'X', 'O'],
                            ['X', '', '']
                        ]);
                        done()
                    })

            })
        })
    })

    describe("El segundo jugador gana la partida", () => {
        describe("El segundo jugador gana la partida con una file con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 0, fila: 1 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 1, fila: 2 },
                { jugador: 'Pedro', columna: 0, fila: 0 },
                { jugador: 'Juan', columna: 0, fila: 2 },
                { jugador: 'Pedro', columna: 2, fila: 0 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server).put("/movimiento").send(movimientos[4]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[5])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Pedro');
                        res.body.should.have.property('tablero').eql([
                            ['O', 'O', 'O'],
                            ['X', '', ''],
                            ['X', 'X', '']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con una columna con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 1, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 0 },
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 2 },
                { jugador: 'Pedro', columna: 0, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server).put("/movimiento").send(movimientos[4]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[5])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Pedro');
                        res.body.should.have.property('tablero').eql([
                            ['O', 'X', 'X'],
                            ['O', '', ''],
                            ['O', 'X', '']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con la primer diagonal con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 1, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 0 },
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 2 },
                { jugador: 'Pedro', columna: 2, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server).put("/movimiento").send(movimientos[4]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[5])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Pedro');
                        res.body.should.have.property('tablero').eql([
                            ['O', 'X', 'X'],
                            ['', 'O', ''],
                            ['', 'X', 'O']
                        ]);
                        done()
                    })

            })
        })

        describe("El primer jugador gana la partida con la segunda diagonal con tres valores iguales", async () => {
            let movimientos = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 2, fila: 0 },
                { jugador: 'Juan', columna: 1, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 2 },
                { jugador: 'Pedro', columna: 0, fila: 2 },
            ]

            it("El juego indica al ganador correctamente", (done) => {
                chai.request(server).put("/comenzar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos[0]).end();
                chai.request(server).put("/movimiento").send(movimientos[1]).end();
                chai.request(server).put("/movimiento").send(movimientos[2]).end();
                chai.request(server).put("/movimiento").send(movimientos[3]).end();
                chai.request(server).put("/movimiento").send(movimientos[4]).end();
                chai.request(server)
                    .put("/movimiento")
                    .send(movimientos[5])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.to.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('ganador').eql('Pedro');
                        res.body.should.have.property('tablero').eql([
                            ['X', 'X', 'O'],
                            ['', 'O', ''],
                            ['O', 'X', '']
                        ]);
                        done()
                    })

            })
        })
    })

    describe("Cuando un jugador elije una posicion ocupada", async () => {
        let movimientos = [
            { jugador: 'Juan', columna: 0, fila: 0 },
            { jugador: 'Pedro', columna: 0, fila: 0 },
        ]
        it("No se realizo la jugada en el tablero", (done) => {
            chai.request(server).put("/comenzar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
                .put("/movimiento")
                .send(movimientos[1])
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Pedro');
                    res.body.should.have.property('tablero').eql([
                        ['X', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ]);
                    done()
                })
        })
    })
})