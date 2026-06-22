# Sistema de Agendamento de Consultas

Sistema web para gerenciamento de uma clínica médica, desenvolvido com **Node.js**, **Express**, **EJS** e **MySQL**.

## Sobre o projeto

A aplicação permite administrar pacientes, médicos e consultas em uma área protegida por login. O sistema possui telas para cadastro, listagem, busca, edição e exclusão dos principais registros da clínica.

## Funcionalidades

- Login de administrador
- Dashboard com resumo de pacientes, médicos e consultas
- Cadastro, listagem, busca, edição e exclusão de pacientes
- Cadastro, listagem, busca, edição e exclusão de médicos
- Agendamento, listagem, busca, edição e exclusão de consultas
- Controle de status da consulta
- Layout com páginas EJS
- Configuração por variáveis de ambiente

## Tecnologias utilizadas

- Node.js
- Express
- EJS
- MySQL
- mysql2
- express-session
- dotenv
- HTML
- CSS
- JavaScript

## Como executar

Clone o repositório:

```bash
git clone https://github.com/Juliasacht/sistema-agendamento-consultas.git
```

Acesse a pasta do projeto:

```bash
cd sistema-agendamento-consultas
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto usando o `.env.example` como base:

```env
APP_PORT=3000
SESSION_SECRET=troque-este-segredo-em-producao

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=clinica_db
```

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE clinica_db;
```

Crie as tabelas necessárias para o sistema:

- Admins
- Pacientes
- Medicos
- Consultas

Inicie a aplicação:

```bash
npm start
```

Ou, em modo de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

## Melhorias futuras

- Adicionar script SQL para criação das tabelas
- Criar testes automatizados
- Melhorar validações dos formulários
- Adicionar documentação com prints das telas
- Publicar uma versão online do projeto
