const mongoose = require('./bancoMongo');

// Produto com campo 'detalhes' misto (Schema-less dentro do campo)
const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true, min: 0 },
    detalhes: { type: mongoose.Schema.Types.Mixed } // Campo flexível para JSON
}, {
    timestamps: { createdAt: 'criado_em', updatedAt: 'atualizado_em' }
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
