# 🏥 FarmaHub API

> Trabalho da disciplina de Programação Web (3º Semestre).

A **FarmaHub API** é o back-end de um sistema de Marketplace de Farmácias. O projeto gerencia o fluxo de vendas entre **Farmacêuticos** (que cadastram produtos e cupons) e **Compradores** (que montam carrinhos e fazem pedidos).

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído com as principais ferramentas do mercado atual:

- **Node.js & TypeScript**: Base do projeto.
- **Express**: Framework de servidor.
- **TypeORM & SQLite**: Banco de dados e ORM.
- **Zod**: Validação de dados (Schemas).
- **JWT (Passport)**: Segurança e Autenticação.
- **Bcrypt**: Criptografia de senhas.

---

## ⚙️ Funcionalidades Principais

### 🔐 Perfis de Acesso (Regras de Negócio)
- **Farmacêutico:** Tem permissão administrativa para criar Produtos e Cupons.
- **Comprador:** Tem permissão para Favoritar, usar Carrinho e fechar Pedidos.

### 🛒 Fluxo de Compra
1. **Autenticação:** Login seguro com Token.
2. **Produtos:** Listagem e busca.
3. **Carrinho:** Adicionar e remover itens.
4. **Cupons:** Validação de código de desconto e data de validade.
5. **Favoritos:** Lista de desejos do usuário.

---

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para rodar o servidor na sua máquina:

1. **Clone o projeto ou baixe os arquivos.**

2. **Instale as dependências:**
   Abra o terminal na pasta do projeto e digite:
   ```bash
   npm install