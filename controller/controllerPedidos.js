const { Pedido, ItemPedido } = require('../model/modelosSql');

exports.listarPedidos = async (req, res) => {
    try {
        // Busca pedidos do usuário 1
        const pedidos = await Pedido.findAll({
            where: { usuario_id: 1 },
            include: [{ model: ItemPedido }], 
            // Ordenar pela coluna 'data_pedido'
            order: [['data_pedido', 'DESC']] 
        });

        // Formata os dados para a View
        const pedidosFormatados = pedidos.map(p => ({
            id: p.id,
            // Ler a data da coluna 'data_pedido'
            data: new Date(p.data_pedido).toLocaleString('pt-BR'), 
            valor: p.valor_total.toFixed(2).replace('.', ','),
            status: p.status,
            qtdItens: p.itens_pedidos ? p.itens_pedidos.length : 0
        }));

        res.render('pedidos', { 
            title: 'Meus Pedidos | Tech Loja',
            pedidos: pedidosFormatados,
            semPedidos: pedidos.length === 0
        });

    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
        res.render('error', { message: "Erro ao buscar seus pedidos.", error });
    }
};
