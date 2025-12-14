const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./bancoSql');

// MODELO USUARIO
class Usuario extends Model {}
Usuario.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'usuarios',
    createdAt: 'criado_em',      
    updatedAt: 'atualizado_em'   
});

// MODELO PEDIDO
class Pedido extends Model {}
Pedido.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'PENDENTE' },
    valor_total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 }
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'pedidos',
    createdAt: 'data_pedido',        
    updatedAt: 'ultima_atualizacao' 
});

// MODELO ITEMPEDIDO
class ItemPedido extends Model {}
ItemPedido.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    preco_unitario: { type: DataTypes.FLOAT, allowNull: false },
    // ID do produto no MongoDB armazenado como texto
    produto_mongodb_id: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'itens_pedido',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

// RELACIONAMENTOS

// 1 Usuario -> N Pedidos
Usuario.hasMany(Pedido, { foreignKey: { name: 'usuario_id', allowNull: false } });
Pedido.belongsTo(Usuario, { foreignKey: { name: 'usuario_id', allowNull: false } });

// 1 Pedido -> N Itens
Pedido.hasMany(ItemPedido, { foreignKey: { name: 'pedido_id', allowNull: false } });
ItemPedido.belongsTo(Pedido, { foreignKey: { name: 'pedido_id', allowNull: false } });

// SINCRONIZAÇÃO
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Tabelas do MySQL (Usuario, Pedido, ItemPedido) sincronizadas com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabelas do MySQL:', error);
    });

module.exports = { Usuario, Pedido, ItemPedido, sequelize };
