const Produto = require('../model/Produto');
const { Pedido, ItemPedido, sequelize } = require('../model/modelosSql');

exports.realizarCompra = async (req, res) => {
    const produtoId = req.params.id;
    
    // Inicia uma transação no MySQL para garantir segurança
    const t = await sequelize.transaction();

    try {
        // Busca o produto no MongoDB
        const produto = await Produto.findById(produtoId);

        // Verifica se existe e se tem estoque
        if (!produto || produto.estoque <= 0) {
            await t.rollback();
            return res.render('error', { message: "Produto esgotado ou indisponível." });
        }

        // Cria o Pedido no MySQL (Simulando Usuário ID 1 - João Silva)
        const novoPedido = await Pedido.create({
            usuario_id: 1, // Hardcoded para teste
            status: 'REALIZADO',
            valor_total: produto.preco
        }, { transaction: t });

        // Cria o Item do Pedido no MySQL
        await ItemPedido.create({
            pedido_id: novoPedido.id,
            produto_mongodb_id: produto._id.toString(),
            quantidade: 1,
            preco_unitario: produto.preco
        }, { transaction: t });

        // Baixa o estoque no MongoDB
        produto.estoque = produto.estoque - 1;
        await produto.save();

        // Confirma a transação no MySQL
        await t.commit();

        // Renderiza tela de sucesso
        res.render('sucesso', { 
            title: 'Compra Realizada', 
            produto: produto.nome,
            pedidoId: novoPedido.id
        });

    } catch (error) {
        // Se der erro, desfaz tudo no MySQL
        await t.rollback();
        console.error("Erro na compra:", error);
        res.render('error', { message: "Falha ao processar a compra.", error });
    }
};
