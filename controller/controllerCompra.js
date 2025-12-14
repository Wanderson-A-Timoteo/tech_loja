const Produto = require('../model/Produto');
const { Pedido, ItemPedido, sequelize } = require('../model/modelosSql');

// 1. EXIBIR A TELA DE CHECKOUT (Quantidade)
exports.exibirCheckout = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.render('error', { message: "Produto não encontrado" });

        res.render('checkout', {
            title: 'Finalizar Compra',
            produto: {
                id: produto._id,
                nome: produto.nome,
                // Mantemos o formatado para exibir bonito
                preco: produto.preco.toFixed(2).replace('.', ','),
                // Campo numérico para o cálculo do JS
                precoNumerico: produto.preco, 
                estoque: produto.estoque
            }
        });
    } catch (error) {
        res.render('error', { message: "Erro ao abrir checkout", error });
    }
};

// 2. PROCESSAR A COMPRA (Recebe Quantidade via POST)
exports.realizarCompra = async (req, res) => {
    const produtoId = req.params.id;
    const quantidade = parseInt(req.body.quantidade) || 1; // Pega do formulário ou usa 1

    const t = await sequelize.transaction();

    try {
        const produto = await Produto.findById(produtoId);

        // Validação de Estoque
        if (!produto || produto.estoque < quantidade) {
            await t.rollback();
            return res.render('error', { message: "Quantidade indisponível no estoque." });
        }

        // Calcula valor total
        const valorTotal = produto.preco * quantidade;

        // Cria Pedido
        const novoPedido = await Pedido.create({
            usuario_id: 1, // Usuário Fixo (João)
            status: 'REALIZADO',
            valor_total: valorTotal
        }, { transaction: t });

        // Cria Item do Pedido
        await ItemPedido.create({
            pedido_id: novoPedido.id,
            produto_mongodb_id: produto._id.toString(),
            quantidade: quantidade,
            preco_unitario: produto.preco
        }, { transaction: t });

        // Baixa Estoque
        produto.estoque = produto.estoque - quantidade;
        await produto.save();

        await t.commit();

        res.render('sucesso', { 
            title: 'Compra Realizada', 
            produto: produto.nome,
            pedidoId: novoPedido.id,
            qtd: quantidade,
            total: valorTotal.toFixed(2).replace('.', ',')
        });

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.render('error', { message: "Falha na compra", error });
    }
};
