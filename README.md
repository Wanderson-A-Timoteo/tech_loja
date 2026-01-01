# 🛒 Tech Loja - Sistema Híbrido (SQL + NoSQL)

![GitHub repo size](https://img.shields.io/github/repo-size/Wanderson-A-Timoteo/tech_loja?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/Wanderson-A-Timoteo/tech_loja?style=social)
![GitHub forks](https://img.shields.io/github/forks/Wanderson-A-Timoteo/tech_loja?style=social)

> Sistema de E-commerce Full Stack. A aplicação demonstra o uso integrado de banco de dados Relacional (MySQL) para pedidos e Não-Relacional (MongoDB) para catálogo de produtos, garantindo consistência e flexibilidade.


<p align="center">
 <a href="#-tecnologias-utilizadas">Tecnologias</a> •
 <a href="#-funcionalidades-principais">Funcionalidades</a> •
 <a href="#-instalação-e-execução">Instalação</a> •
 <a href="#-como-testar-o-fluxo-demo">Como Testar</a> •
 <a href="#-desenvolvedor">Autor</a>
</p>

## 🚀 Tecnologias Utilizadas

- **Back-end:** Node.js, Express
- **Bancos de Dados:**
  - MySQL (Sequelize ORM) - *Gestão de Usuários e Pedidos*
  - MongoDB (Mongoose ODM) - *Catálogo de Produtos e Estoque*
- **Front-end:** Handlebars (HBS), Bootstrap 5, JavaScript Vanilla
- **Arquitetura:** MVC (Model-View-Controller)

## ✨ Funcionalidades Principais

### 🛍️ Área do Cliente
- **Vitrine de Produtos:** Listagem dinâmica consumindo do MongoDB.
- **Detalhes do Produto:** Ficha técnica com campos flexíveis (NoSQL) e layout responsivo.
- **Cálculo Dinâmico:** Atualização de preço em tempo real no Front-end ao alterar quantidade.
- **Checkout Transacional:** Compra segura utilizando **Database Transactions**.
  - *Só gera o pedido no MySQL se a baixa de estoque no MongoDB for bem-sucedida.*
- **Histórico de Pedidos:** Visualização das compras realizadas pelo usuário (MySQL).

### ⚙️ Área Administrativa
- **Dashboard:** Visão geral com contadores (Usuários, Pedidos, Produtos) e Alerta de Estoque Baixo.
- **Gerenciamento de Pedidos:** Tabela completa com status dos pedidos.
- **Ações de Status:** Botões funcionais para *Concluir*, *Suspender* ou *Cancelar* pedidos.

### 🛠️ Ferramentas de Sistema
- **Povoamento Automático:** Rotas para resetar e popular os bancos de dados com dados de teste (`bulkCreate`/`insertMany`).

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js
- MySQL Server (Rodando na porta padrão ou configurado no Sequelize)
- MongoDB (Rodando localmente ou Atlas)

### Passos
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Wanderson-A-Timoteo/tech-loja.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure os Bancos de Dados:**
- Certifique-se que o MySQL e o MongoDB estão rodando.

- Ajuste as credenciais em model/modelosSql.js (Sequelize) e a conexão do Mongoose em app.js se necessário.

4. **Execute o projeto:**
   ```bash
   npm start
   ```

5. **Acesse no navegador:**
   ```bash
   http://localhost:3000
   ```

## 🧪 Como Testar o Fluxo (Demo)

Como o sistema pode iniciar vazio, siga este roteiro:

- 1. Acesse `http://localhost:3000/reset` para limpar completamente os bancos.
- 2. Na Home, clique em "Realizar Povoamento" para gerar produtos e usuários de teste.
- 3. Navegue, escolha um produto e finalize uma compra.
- 4. Acesse o menu "Minhas Compras" para ver o histórico.
- 5. Acesse o menu "Dashboard" ou "Gerenciamento" para ver a visão do admin.

---

## 👨‍💻 Desenvolvedor

<div align="center">
  <a href="https://github.com/Wanderson-A-Timoteo">
    <img src="https://github.com/Wanderson-A-Timoteo.png" width="120px;" alt="Foto de Perfil do Wanderson Timóteo no GitHub" style="border-radius: 50%;"/>
  </a>
  <br />
  <br />
  <h4>Wanderson Timóteo</h4>
  <a href="https://github.com/Wanderson-A-Timoteo" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Badge GitHub">
  </a>
</div>