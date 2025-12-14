const Sequelize = require('sequelize');

// Eu uso Windows 11 Pro + WSL2 (Ubuntu): MySQL está rodando no Windows, e o Node.js no WSL2. Para conectar os dois, uso o IP do Windows. 
// Substitua pelo seu IP do Windows (verifique no terminal: ip route show default | awk '{print $3}')
const ipWindows = '172.27.48.1'; 

const sequelize = new Sequelize(
    'tech_loja',       
    'fullstack',       
    '12345678', 
    {
        host: ipWindows,
        dialect: 'mysql',
        port: 3307,        
        timezone: '-04:00' // Ajuste para o seu fuso horário, se necessário
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o Banco de Dados MySQL estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar no MySQL:', err);
    });

module.exports = { Sequelize, sequelize };
