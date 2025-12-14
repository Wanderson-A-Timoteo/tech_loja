const mongoose = require('mongoose');

// Eu uso Windows 11 Pro + WSL2 (Ubuntu): MongoDB está rodando no Windows, e o Node.js no WSL2. Para conectar os dois, uso o IP do Windows. 
// Substitua pelo seu IP do Windows (verifique no terminal: ip route show default | awk '{print $3}')
const ipWindows = '172.27.48.1'; 

// Configuração da URI de conexão
const uri = `mongodb://${ipWindows}:27017/ecommerce`;

mongoose.connect(uri)
    .then(() => {
        console.log('Conexão com MongoDB (Mongoose) estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao conectar no MongoDB:', error);
    });

module.exports = mongoose;
