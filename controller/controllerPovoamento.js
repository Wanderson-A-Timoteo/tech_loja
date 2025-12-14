const { Usuario, Pedido, ItemPedido, sequelize } = require('../model/modelosSql');
const Produto = require('../model/Produto');

exports.gerarDados = async (req, res) => {
    try {
        // 1. Limpeza do SQL
        // Desativa verificação de chave estrangeira temporariamente para permitir TRUNCATE
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true }); // Recria as tabelas do zero
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        // Limpeza do MongoDB
        await Produto.deleteMany({});

        console.log("Bancos limpos. Iniciando inserção...");

        // Criar Usuários
        await Usuario.bulkCreate([
            { nome: 'João Silva', email: 'joao@email.com', senha: '123' },
            { nome: 'Maria Figueira', email: 'maria@email.com', senha: '123' },
            { nome: 'Admin Tech', email: 'admin@techloja.com', senha: 'admin' }
        ]);

        // Criar Produtos
        const produtos = [
            { nome: 'Smartphone Samsung A5', preco: 1999.99, estoque: 50, detalhes: { marca: 'Samsung', modelo: 'A5', cor: 'Preto' } },
            { nome: 'Tablet Xiaomi', preco: 1200.99, estoque: 30, detalhes: { marca: 'Xiaomi', armazenamento: '128GB' } },
            { nome: 'Notebook Ultra', preco: 3500.62, estoque: 5, detalhes: { processador: 'i7', ram: '16GB', ssd: '512GB' } },
            { nome: 'Fone Bluetooth', preco: 99.78, estoque: 100, detalhes: { tipo: 'In-ear', conexao: 'Bluetooth 5.0' } },
            { nome: 'Smartwatch Fit', preco: 499.99, estoque: 75, detalhes: { sensores: 'Cardíaco, Oxímetro' } },
            { nome: 'Câmera Digital', preco: 2458.54, estoque: 2, detalhes: { resolucao: '24MP', zoom: '10x' } },
            { nome: 'Xbox Series S', preco: 2500.00, estoque: 15, detalhes: { armazenamento: '512GB', controle: '1' } },
            { nome: 'Monitor 24"', preco: 899.99, estoque: 40, detalhes: { painel: 'IPS', hertz: '75Hz' } },
            { nome: 'Teclado Mecânico', preco: 250.00, estoque: 10, detalhes: { switch: 'Blue', rgb: 'Sim' } },
            { nome: 'Mouse Gamer', preco: 120.50, estoque: 60, detalhes: { dpi: '12000' } }
        ];
        await Produto.insertMany(produtos);

        console.log("Povoamento concluído!");
        res.redirect('/');

    } catch (erro) {
        console.error("Erro fatal ao povoar:", erro);
        res.status(500).send("Erro ao povoar: " + erro.message);
    }
};
