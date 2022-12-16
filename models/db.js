const Sequelize = require("sequelize"); // S maisculo para importar o pacote

const db_guimaraes = new Sequelize('guimaraes', 'root', '', { // s minusculo para referenciar o banco de dados
    host: 'localhost',
    dialect: 'mysql'
});

module.exports={
    Sequelize: Sequelize,
    db_guimaraes: db_guimaraes
}