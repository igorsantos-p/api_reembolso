# API Reembolso

API REST desenvolvida para gerenciamento de solicitações de reembolso corporativo.

O sistema permite que colaboradores registrem pedidos de reembolso com comprovantes anexados e que gestores consultem e acompanhem as solicitações cadastradas.

## Funcionalidades

- Cadastro de usuários
- Autenticação com JWT
- Controle de acesso por perfil (Employee e Manager)
- Criação de solicitações de reembolso
- Upload de comprovantes
- Consulta de reembolsos
- Paginação de resultados
- Validação de dados com Zod

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- Multer
- Zod

## Arquitetura

```text
src
├── controllers
├── routes
├── middlewares
├── configs
├── database
├── providers
├── utils
├── types
├── app.ts
└── server.ts
```

### Responsabilidades

| Camada | Função |
|----------|----------|
| Controllers | Tratamento das requisições HTTP |
| Routes | Definição dos endpoints |
| Middlewares | Autenticação e autorização |
| Prisma | Acesso ao banco de dados |
| Providers | Serviços auxiliares (armazenamento de arquivos) |
| Utils | Tratamento de erros e utilitários |

---

## Modelo de Dados

### Usuário

```text
User
├── id
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt
```

### Reembolso

```text
Refund
├── id
├── name
├── amount
├── category
├── filename
├── userId
├── createdAt
└── updatedAt
```

### Perfis

- employee
- manager

### Categorias

- food
- services
- transport
- accommodation
- others

---

## Instalação

Clone o projeto:

```bash
git clone https://github.com/igorsantos-p/api_reembolso.git
```

Entre na pasta:

```bash
cd api_reembolso
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env`:

```env
JWT_SECRET=sua_chave_secreta
PORT=3333
```

---

## Banco de Dados

Execute as migrations:

```bash
npx prisma migrate dev
```

Gerar cliente Prisma:

```bash
npx prisma generate
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

---

## Executando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Servidor disponível em:

```text
http://localhost:3333
```

---

## Autenticação

A API utiliza JWT.

Após realizar login, envie o token no header:

```http
Authorization: Bearer TOKEN
```

---

## Endpoints

### Criar usuário

```http
POST /users
```

Body:

```json
{
  "name": "Pedro Silva",
  "email": "Pedro@email.com",
  "password": "123456",
  "role": "employee"
}
```

<img width="1920" height="1012" alt="create-user" src="https://github.com/user-attachments/assets/2ed2215a-77a7-4c41-914a-c49dbeadf4a6" />


---

### Login

```http
POST /sessions
```

Body:

```json
{
  "email": "pedro@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt_token",
  "user": {}
}
```

<img width="1920" height="1012" alt="login" src="https://github.com/user-attachments/assets/9b360cfb-0ec1-4068-b00d-312abc5e19b1" />


---

### Criar reembolso

```http
POST /refunds
```

Permissão:

```text
employee
```

Body:

```json
{
  "name": "Almoço cliente",
  "category": "food",
  "amount": 89.90,
  "filename": "comprovante.png"
}
```
O sistema realiza o upload da imagem primeiro e retorna o nome do arquivo com hash garantindo o tamanho mínimo de 20 caracteres, em seguida realiza o cadastro da solicitação do reembolso.

<img width="1920" height="1012" alt="create-refund" src="https://github.com/user-attachments/assets/80839286-9e40-440f-8ced-903749173c92" />


---

### Listar reembolsos

```http
GET /refunds
```

Permissão:

```text
manager
```

Query Params:

```http
?name=
&page=1
&perPage=10
```

<img width="1920" height="1012" alt="index-refund" src="https://github.com/user-attachments/assets/87c45c13-38bf-454b-9e62-7f15943c631d" />


---

### Buscar reembolso

```http
GET /refunds/:id
```

<img width="1920" height="1012" alt="show-refund" src="https://github.com/user-attachments/assets/e0aafc0a-3583-4181-bd54-9a2740e477c7" />


Permissão:

```text
employee ou manager
```

---

## Controle de Acesso

### Employee

- Criar reembolso

### Manager

- Consultar todos os reembolsos
- Consultar reembolso específico

---

## Upload de Arquivos

O sistema suporta upload de comprovantes utilizando Multer.

Os arquivos são armazenados localmente na pasta:

```text
tmp/uploads
```

---

## Conceitos Aplicados

- API REST
- TypeScript
- ORM com Prisma
- Hash de senha com Bcrypt
- JWT Authentication
- Role Based Access Control (RBAC)
- Upload de arquivos
- Paginação
- Validação de dados
- Tratamento centralizado de erros
- Arquitetura em camadas
