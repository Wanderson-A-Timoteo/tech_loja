const Produto = require('../model/Produto');

exports.tela_principal = async (req, res) => {
    try {
        // Busca produtos no MongoDB
        const produtos = await Produto.find({}).limit(8);

        // Extrai os dados do documento Mongoose
        const produtosFormatados = produtos.map(p => ({
            id: p._id,
            nome: p.nome,
            preco: p.preco.toFixed(2).replace('.', ','),
            estoque: p.estoque
        }));

        res.render('index', { 
            title: 'Tech Loja',
            produtos: produtosFormatados,
            semProdutos: produtos.length === 0
        });

    } catch (error) {
        console.error("Erro na Home:", error);
        res.render('error', { message: "Erro ao carregar vitrine", error });
    }
};
