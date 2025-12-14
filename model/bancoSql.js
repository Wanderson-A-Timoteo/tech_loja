const Sequelize = require('sequelize');

// IP confirmado no seu terminal
const ipWindows = '172.27.48.1'; 

const sequelize = new Sequelize(
    'ecommerce',       // Nome correto (PDF Pág 1) 
    'fullstack',       // Usuário correto (PDF Pág 1) [cite: 501]
    'senha_fullstack', // Senha correta (PDF Pág 1) 
    {
        host: ipWindows,
        dialect: 'mysql',
        port: 3307,        // Sua porta personalizada
        timezone: '-03:00' // Fuso horário do Brasil
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com MySQL (Sequelize) estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar no MySQL:', err);
    });

module.exports = { Sequelize, sequelize };
