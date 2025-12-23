const { Pedido, ItemPedido, Usuario } = require('../model/modelosSql');

// LISTAR (GET)
exports.listarTodosPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: Usuario },
                { model: ItemPedido }
            ],
            order: [['data_pedido', 'DESC']]
        });

        const pedidosFormatados = pedidos.map(p => ({
            id: p.id,
            cliente: p.Usuario ? p.Usuario.nome : 'Desconhecido',
            // Formatações de data
            data: new Date(p.data_pedido).toLocaleString('pt-BR'),
            atualizacao: new Date(p.ultima_atualizacao).toLocaleString('pt-BR'),
            valor: p.valor_total.toFixed(2).replace('.', ','),
            status: p.status,
            // Conta quantos produtos diferentes tem no pedido
            qtdItens: p.ItemPedidos ? p.ItemPedidos.length : 0
        }));

        res.render('gerenciamento', { 
            title: 'Gerenciamento de Pedidos | Admin',
            pedidos: pedidosFormatados,
            semPedidos: pedidos.length === 0
        });

    } catch (error) {
        console.error("Erro no gerenciamento:", error);
        res.render('error', { message: "Erro ao carregar painel", error });
    }
};

// ATUALIZAR STATUS (POST)
exports.atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { novoStatus } = req.body; // Recebe 'CANCELADO', 'SUSPENSO' ou 'CONCLUIDO' do botão

        // Atualiza o Status e a Data de Atualização
        await Pedido.update(
            { 
                status: novoStatus,
                ultima_atualizacao: new Date() 
            },
            { where: { id: id } }
        );

        res.redirect('/gerenciamento'); // Recarrega a página

    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.render('error', { message: "Não foi possível atualizar o pedido", error });
    }
};
