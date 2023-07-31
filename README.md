# API NODE.JS SOLID | Find a Friend API REST

Desafio do Ignite onde foi proposto o desenvolvimento de uma API para adoção de animais, chamada de FindAFriend API, utilizando SOLID e testes unitário e e2e.

## Tecnologias usadas

- `fastify`: framework web
- `prisma`: ORM para banco de dados
- `supertest`: testes de api
- `tsup`: compilação typescript
- `tsx`: suporte para TSX
- `typescript`: linguagem de programação
- `vitest`: ferramente para testes
- `zod`: ferramenta pra validação de dados

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deveser possível realizar login como uma ORG

## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de Whatsapp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG va WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Para usar a aplicação

```bash
# Clone Repository
$ git clone

# Go to project folder
$ cd ignite-api-find-a-friend 

# Install dependencies
$ npm install


# rename file .env.example to .env

# run docker compose
$ docker compose up -d

# run prisma
$ npx prisma migrate dev

# Run Tests
$ npm run test
$ npm run test:e2e

# Run server in dev mode
$ npm run start:dev

#build
$ npm run build
```
