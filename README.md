# Clínica Médica

Sistema web para gerenciamento de uma clínica médica, desenvolvido com **Node.js**, **Express**, **EJS** e **MySQL**.

## Sobre o projeto

Este projeto permite o gerenciamento de pacientes, médicos e consultas em uma clínica médica. O sistema possui uma área administrativa com login, onde é possível cadastrar, listar, editar, buscar e excluir informações.

## Funcionalidades

* Login de administrador
* Cadastro de pacientes
* Listagem de pacientes
* Edição e exclusão de pacientes
* Cadastro de médicos
* Listagem de médicos
* Edição e exclusão de médicos
* Agendamento de consultas
* Listagem, edição e exclusão de consultas
* Dashboard administrativo

## Tecnologias utilizadas

* Node.js
* Express
* EJS
* MySQL
* HTML
* CSS
* JavaScript
* Dotenv
* Express-session

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Juliasacht/clinica-medica-node-mysql.git
```

### 2. Acesse a pasta do projeto

```bash
cd clinica-medica-node-mysql
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto e configure os dados do banco:

```env
APP_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha
DB_NAME=clinica_db
```

Caso seu MySQL não tenha senha, deixe assim:

```env
DB_PASS=
```

### 5. Crie o banco de dados

No MySQL Workbench, crie o banco de dados com o nome:

```sql
CREATE DATABASE clinica_db;
```

Depois, crie as tabelas necessárias para o funcionamento do sistema.

### 6. Inicie o projeto

```bash
npm run dev
```

Ou:

```bash
npm start
```

Depois acesse no navegador:

```text
http://localhost:3000
```

## Acesso inicial

```text
Login: admin
Senha: 123456
```

## Estrutura do projeto

```text
src/
├── controllers/
├── models/
├── routes/
├── views/
└── middlewares/
```

## Melhorias futuras

* Criptografar senha do administrador
* Melhorar a responsividade das telas
* Adicionar validações nos formulários
* Criar mensagens de sucesso e erro
* Implementar paginação nas listagens

## Autora

Desenvolvido por **Júlia de Souza Sacht**.

GitHub: [@Juliasacht](https://github.com/Juliasacht)
