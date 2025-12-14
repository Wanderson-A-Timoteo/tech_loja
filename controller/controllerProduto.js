const Produto = require('../model/Produto');

exports.verDetalhes = async (req, res) => {
    try {
        const id = req.params.id;
        // Busca o produto pelo ID no MongoDB
        const produto = await Produto.findById(id);

        if (!produto) {
            return res.render('error', { message: "Produto não encontrado." });
        }

        // Formata os dados
        const produtoFormatado = {
            id: produto._id.toString(),
            nome: produto.nome,
            preco: produto.preco.toFixed(2).replace('.', ','),
            estoque: produto.estoque,
            // Importante: Como 'detalhes' é um objeto misto (NoSQL),
            // passamos ele direto para a view renderizar as propriedades dinâmicas
            detalhes: produto.detalhes 
        };

        res.render('detalhes', { 
            title: `Detalhes - ${produto.nome}`,
            produto: produtoFormatado
        });

    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        res.render('error', { message: "Erro ao carregar produto", error });
    }
};
