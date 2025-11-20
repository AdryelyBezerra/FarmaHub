# 🏥 FarmaHub API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> **API RESTful** para gerenciamento de Marketplace Farmacêutico, focada em controle de estoque, fluxo de vendas e segurança.

---

## 💻 Sobre o Projeto

A **FarmaHub API** é o back-end robusto de um sistema de e-commerce voltado para farmácias. O projeto foi desenvolvido com foco em **Clean Code** e arquitetura escalável, gerenciando o fluxo completo entre **Farmacêuticos** (Administradores) e **Compradores**.

O sistema implementa regras de negócio complexas, como validação de estoques em tempo real, aplicação de cupons de desconto com verificação de validade e controle de acesso baseado em cargos (RBAC).

---

## 🚀 Tecnologias e Ferramentas

O projeto utiliza as principais tecnologias do mercado atual:

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Superset JavaScript)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database & ORM:** [SQLite](https://www.sqlite.org/) com [TypeORM](https://typeorm.io/)
- **Validação:** [Zod](https://zod.dev/) (Schema Validation)
- **Segurança:**
  - [Passport-JWT](https://www.passportjs.org/) (Estratégia de Autenticação)
  - [Bcrypt](https://www.npmjs.com/package/bcrypt) (Hashing de senhas)

---

## ⚙️ Funcionalidades Principais

### 🔐 Segurança e Acesso (RBAC)
- **Autenticação JWT:** Login seguro com tokens de sessão.
- **Farmacêutico:** Permissão total para gestão de produtos e criação de campanhas (cupons).
- **Comprador:** Acesso exclusivo às funcionalidades de compra, carrinho e favoritos.

### 📦 Gestão de Estoque
- CRUD completo de produtos.
- **Trava de Estoque:** O sistema impede automaticamente a venda de itens sem quantidade suficiente.

### 🛒 Fluxo de Venda
- **Carrinho Inteligente:** Adição e remoção dinâmica de itens.
- **Sistema de Cupons:** Validação de códigos promocionais, verificando existência e data de expiração.
- **Favoritos:** Lista de desejos persistente por usuário.
- **Pedidos:** Finalização de compra com baixa automática no banco de dados.

---

## 🛠️ Instalação e Execução

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

## 📡 Documentação dos Endpoints

Recomenda-se o uso do Insomnia, Postman ou a extensão REST Client (VS Code) utilizando o arquivo tests/api.http incluído no projeto.

### 🟢 Autenticação (Público)
- `POST /auth/registro` - Criar nova conta.
- `POST /auth/login` - Entrar no sistema.

#### 🔒 Produtos & Cupons (Privado)
- `GET /produtos` - Listar catálogo *(Todos)*.
- `POST /produtos` - Cadastrar produto *(Apenas Farmacêutico)*.
- `PUT /produtos/:id` - Atualizar dados/preço *(Apenas Farmacêutico)*.
- `DELETE /produtos/:id` - Remover produto *(Apenas Farmacêutico)*.
- `POST /cupons` - Criar cupom de desconto *(Apenas Farmacêutico)*.

#### 🛒 Compras (Requer Token)
- `POST /carrinho` - Adicionar item ao carrinho.
- `GET /carrinho` - Visualizar itens atuais.
- `DELETE /carrinho/:id` - Remover item do carrinho.
- `POST /cupons/aplicar` - Validar e aplicar desconto.
- `POST /pedido` - Finalizar compra e baixar estoque.
- `GET /favoritos` - Listar produtos favoritos.

---

## 👨‍💻 Autores e Colaboradores

Este projeto foi desenvolvido originalmente como parte da disciplina de Programação Web.

- **Luiz Henrique**
- **Tatiane da Silva**
- **Maria Adryely**
- **Gabriela Marques**

<p align="center"> Desenvolvido com 💙 por Luiz Henrique </p>
