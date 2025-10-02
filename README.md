# Agrocitro

Esse é o projeto Agrocitro, aonde é possível fazer os registros de plantio e colheita e agendar suas irrigações para sua colheita de laranjas.

### Requisitos e pré-condições
Antes de tudo, é necesário feramentas instaladas no ambiente de desenvolvimento como:
- **Node.js**, para executar o backend (servidor javascript)
- **npm**, para a instalação de dependências
- **MySQL** como banco de dados

### Dependências

No package.json você deve ser incluido pelo menos:
- **express**, framework web para Node.js
- **mysql2** cliente para conectar ao MySQL.

Para instalar as dependências, no terminal, dentro da raiz do projeto, deve se utilizar:
```bash
  npm install
```
Esse comando lê o package.json e instala tudo conforme as versões ali declaradas.

### Variáveis de ambiente
Para conectar ao banco de dados, e possivelmente configurar porta do servidor e credenciais, deverá ser definido algumas variáveis de ambiente.

Normalmente os projetos Node + MySQL têm algo como:

- DB_HOST — endereço do servidor MySQL (ex: localhost)
- DB_PORT — porta MySQL (ex: 3306)
- DB_USER — usuário do banco
- DB_PASSWORD — senha do banco
- DB_NAME — nome do banco de dados usado pelo projeto
- PORT — porta em que o servidor Node vai escutar (ex: 3000 ou 8080)

Pode ser usado um arquivo .env (com pacote dotenv) para gerenciar essas variáveis. Se o projeto já usar dotenv, crie um arquivo .env no diretório raiz com algo como:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```
### Comando build
Como o projeot é essencialmente um backend simples com Node.js (e serve páginas HTML/JS no frontend), não há build “complexo” (como bundlers, transpilers):

- npm init — para inicializar o projeto Node.js (criar package.json) 
GitHub

- npm install express — instalar Express 
GitHub

- npm install mysql2 — instalar cliente MySQL 
GitHub

### Comandos de incialização

Depois de configurado (dependências instaladas, variáveis de ambiente definidas, banco de dados rodando e com schema populado), inicie a aplicação com:
````
npm start
````

Esse comando deve estar no package.json (em scripts.start) apontando para node server.js ou equivalente.

Se não tiver, você pode diretamente:
````
node server.js
````

ou, se estiver usando nodemon para desenvolvimento:
````
npx nodemon server.js
````
Quando o servidor estiver rodando, acesse via navegador algo como http://localhost:3000 (ou a porta que você definiu) para ver as páginas frontend (index.html, colheita.html etc.).
