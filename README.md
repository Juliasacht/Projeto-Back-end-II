# Clínica Médica

Sistema web para gerenciamento de uma clínica médica, desenvolvido com Node.js, Express, EJS e MySQL.

## Sobre o Projeto

Esta aplicação permite que uma clínica organize pacientes, médicos e consultas em uma área administrativa protegida por login. O sistema oferece telas para cadastro, listagem, busca, edição e exclusão dos principais registros da clínica.

## Funcionalidades

- Login de administrador
- Dashboard com resumo de pacientes, médicos e consultas do dia
- Cadastro, busca, edição e exclusão de pacientes
- Cadastro, busca, edição e exclusão de médicos
- Agendamento, busca, edição e exclusão de consultas
- Controle de status da consulta
- Layout responsivo com páginas EJS
- Configuração de ambiente com `.env`

## Tecnologias Utilizadas

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

## Pré-requisitos

Antes de iniciar, tenha instalado:

- Node.js
- npm
- MySQL
- Git

## Como Executar o Projeto

Clone o repositório:

```bash
git clone https://github.com/Juliasacht/clinica-medica-node-mysql.git
```

Acesse a pasta do projeto:

```bash
cd clinica-medica-node-mysql
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
DB_PASS=sua_senha
DB_NAME=clinica_db
```

Se o seu MySQL não tiver senha, deixe o campo vazio:

```env
DB_PASS=
```

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE clinica_db;
```

Depois, crie as tabelas necessárias para o sistema:

- `Admins`
- `Pacientes`
- `Medicos`
- `Consultas`

## Rodando a Aplicação

Para iniciar em modo normal:

```bash
npm start
```

Para iniciar em modo desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:3000
```

Se a porta no `.env` estiver como `APP_PORT=3001`, acesse:

```text
http://localhost:3001
```

## Estrutura do Projeto

```text
.
├── app.js
├── package.json
├── public/
│   └── css/
│       └── styles.css
└── src/
    ├── app.js
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── views/
```

## Principais Rotas

```text
/                  Página inicial
/admin/login       Login do administrador
/admin/dashboard   Dashboard administrativo
/pacientes         Gestão de pacientes
/medicos           Gestão de médicos
/consultas         Gestão de consultas
```

## Acesso Administrativo

O login administrativo depende dos dados cadastrados na tabela `Admins` do banco de dados.

Exemplo usado durante o desenvolvimento:

```text
Login: admin
Senha: 123456
```


## Melhorias Futuras

- Criptografar a senha do administrador
- Adicionar mensagens de sucesso após cadastros e edições
- Implementar paginação nas listagens
- Criar validações mais completas nos formulários
- Adicionar testes automatizados
- Melhorar o controle de permissões

## Autora

Desenvolvido por Júlia de Souza Sacht.

GitHub: [@Juliasacht](https://github.com/Juliasacht)
