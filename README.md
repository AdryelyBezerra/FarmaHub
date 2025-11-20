# 🏥 FarmaHub API

> Projeto de Backend para um Marketplace de Farmácias. Desenvolvido como trabalho da disciplina de Programação Web (3º Semestre).

A **FarmaHub API** é um sistema RESTful que gerencia o fluxo de compras entre farmacêuticos (vendedores) e clientes. O sistema controla estoques, carrinhos de compra, favoritos, pedidos e sistema de cupons de desconto.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** & **TypeScript**: Ambiente de execução e linguagem.
- **Express**: Framework para gestão das rotas HTTP.
- **TypeORM** & **SQLite**: ORM para manipulação do banco de dados.
- **Zod**: Validação de dados de entrada (Schemas).
- **JWT (JSON Web Token)** & **Passport**: Autenticação e segurança.
- **Bcrypt**: Criptografia de senhas.

---

## ⚙️ Funcionalidades

### 🔐 Autenticação e Perfis
- **Login e Registro:** Autenticação via Token JWT.
- **Controle de Acesso (RBAC):**
  - `Farmacêutico`: Pode criar/editar/excluir produtos e criar cupons.
  - `Comprador`: Pode adicionar ao carrinho, favoritar e realizar compras.

### 💊 Gestão de Produtos
- CRUD completo de produtos (Medicamentos, Cosméticos, etc.).
- Controle de estoque (impede venda se estoque zerado).

### 🛒 Experiência de Compra
- **Carrinho:** Adicionar/Remover itens.
- **Favoritos:** Lista de desejos do usuário.
- **Cupons:** Sistema de desconto via código (validação de data e existência).
- **Pedidos:** Finalização de compra com baixa no estoque.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
Tenha instalado na sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Git

Siga os passos abaixo para rodar o servidor na sua máquina:

1. **Clone o projeto ou baixe os arquivos.**

2. **Instale as dependências:**
   Abra o terminal na pasta do projeto e digite:
   ```bash
   npm install

3. **Rode o servidor**
   ```bash
   npm run dev

4. **Pronto! O servidor estará rodando em: http://localhost:3000 O banco de dados database.sqlite será criado automaticamente na primeira execução.**

---

endpoints 📡 Documentação da API

Para testar as rotas, recomenda-se usar a extensão REST Client do VS Code com o arquivo tests/api.http incluído no projeto, ou utilizar o Insomnia/Postman.

🟢 Rotas Públicas
   POST /auth/registro - Criar nova conta.
   POST /auth/login - Entrar no sistema.

🔒 Rotas Protegidas (Requer Bearer Token)

📦 Produtos
   GET /produtos - Listar produtos.
   POST /produtos - Criar produto (Apenas Farmacêutico).
   PUT /produtos/:id - Atualizar produto (Apenas Farmacêutico).
   DELETE /produtos/:id - Deletar produto (Apenas Farmacêutico).

🏷️ Cupons
   POST /cupons - Criar novo cupom (Apenas Farmacêutico).
   POST /cupons/aplicar - Validar cupom no carrinho.

❤️ Favoritos & 🛒 Carrinho
   GET /favoritos - Ver meus favoritos.
   POST /favoritos - Favoritar um produto.
   GET /carrinho - Ver itens no carrinho.
   POST /carrinho - Adicionar item.
   DELETE /carrinho/:produto_id - Remover item.

---

👨‍💻 Autores

Trabalho desenvolvido por:
   Luiz Henrique
   Tatiane da Silva
   Maria Adryely
   Gabriela Marques
