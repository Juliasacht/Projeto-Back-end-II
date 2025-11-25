# Clínica MVC (Node.js + Express + MySQL)

Projeto base seguindo o diagrama (Pacientes, Consultas, Médicos e Admin), com **cadastro** e **listagem** de Médicos prontos, usando MVC e EJS.

## Requisitos
- Node.js 18+
- MySQL (XAMPP)
- Porta padrão 3306 (ajuste no `.env` se necessário)

## Como rodar
```bash
cp .env.example .env
# edite o .env se quiser mudar user/senha/banco

npm install
# cria o banco e tabelas
npm run db:seed

# inicia o servidor
npm run dev
```
Acesse http://localhost:3000

## Rotas
- `GET /` – home.
- `GET /medicos` – listar médicos.
- `GET /medicos/novo` – formulário de cadastro.
- `POST /medicos/novo` – salvar cadastro.

## Estrutura
```
src/
  app.js
  routes/medicos.js
  controllers/medicoController.js
  models/
    db.js
    medicoModel.js
  views/
    layouts/main.ejs
    home.ejs
    404.ejs
    medicos/
      index.ejs
      create.ejs
public/css/styles.css
schema.sql
scripts/seed.js
```

> Próximos passos: implementar CRUD completo e módulos de Pacientes e Consultas.

> Nota: esta cópia já inclui um arquivo `.env` configurado com `DB_PORT=3340`.
