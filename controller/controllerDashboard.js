const { Usuario, Pedido } = require('../model/modelosSql');
const Produto = require('../model/Produto');

exports.exibirDashboard = async (req, res) => {
    try {
        const totalUsuarios = await Usuario.count();
        const totalPedidos = await Pedido.count();
        const totalProdutos = await Produto.countDocuments();
        
        // Exemplo: Produtos com estoque baixo (menos de 10)
        const produtosBaixoEstoque = await Produto.find({ estoque: { $lt: 10 } }).lean();

        res.render('dashboard', {
            title: 'Dashboard Administrativo',
            stats: { usuarios: totalUsuarios, pedidos: totalPedidos, produtos: totalProdutos },
            alertaEstoque: produtosBaixoEstoque
        });
    } catch (error) {
        res.render('error', { message: "Erro no dashboard", error });
    }
};
