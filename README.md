# Denthus
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL0yzPI6iXUeBmEOXPBasfetecEKJvd9gdRbAZzhQox_afZkdzvlf8OxAou69T0BMdVo&usqp=CAU" alt="Dentista icon" width="20%"/>



---

## 🚀 Visão Geral
Denthus é uma plataforma (Web + Mobile) que conecta laboratórios, clínicas e laboratório de dentistas a cadistas digitais, permitindo:
- Compra e consumo de créditos para abertura de trabalhos  
- Criação, aceitação e gerenciamento de trabalhos  
- Registro de transações (compra de crédito e pagamento de trabalho)  
- Marketplace de produtos entre cadistas e laboratórios  

**Data de início:** 13/06/2025

---

## 🛠️ Tecnologias
- **Backend:** NestJS, TypeScript, Prisma (SQLite em dev)  
- **Frontend Web:** React, Next.js, Tailwind CSS  
- **Mobile:** React Native  
- **Banco de Dados:** SQLite (dev) / Postgres (prod)  
- **ORM:** Prisma  
- **Autenticação:** JWT, bcrypt  
- **Validação:** class‑validator, class‑transformer  

---

## 🏗️ Arquitetura
- **Modular**: cada domínio tem módulo, serviço e controlador  
- **PrismaService**: centraliza conexão e transações  
- **DTOs + Pipes**: validação e transformação de payloads  
- **Relações**:
  - User ↔ Cadista (1:1)  
  - User ↔ Lab (1:1)  
  - Lab ↔ Credit (1:N)  
  - Credit ↔ Job (1:N) via creditId  
  - Job ↔ Skill (N:M) via JobSkill  
  - Transaction registra todas as movimentações  

---

## 📦 Módulos Principais
- **AuthModule**: signin, JWT, rota `/auth/me`  
- **UserModule**: CRUD de usuários + perfis  
- **JobModule**: CRUD de jobs, consumo de crédito, registro de JOB_PAYMENT  
- **CreditModule**: compra de créditos (upsert), inicia remaining = quantity, registro de CREDIT_PURCHASE  
- **TransactionModule**: histórico de transações (compra, pagamento, taxas)  
- **SkillModule**: CRUD de skills, tabelas de junção  

---

## 🔧 Estrutura de Pastas
src/  
├── auth/  
├── database/           # PrismaService, configuração do DB  
├── user/               # user.controller.ts, user.service.ts, dto/  
├── job/                # job.controller.ts, job.service.ts, dto/  
├── credit/             # credit.controller.ts, credit.service.ts, dto/  
├── transaction/        # transaction.controller.ts, transaction.service.ts, dto/  
├── skill/              # skill.controller.ts, skill.service.ts, dto/  
└── main.ts  

---

## ⚙️ Configuração

1. Clone o repositório  
2. Instale dependências:
   npm install  
3. Crie `.env`:
   DATABASE_URL="file:./dev.db"  
   JWT_SECRET="sua_chave_secreta"  
4. Gere client Prisma:
   npx prisma generate  
5. Rode migrations:
   npx prisma migrate dev --name init  

---

## ▶️ Executando

- **Dev**: npm run start:dev  
- **Prod**: npm run build && npm run start:prod  
A API fica em http://localhost:3000  

---

## 📑 Endpoints

### Auth
- POST /auth/signin  
- GET  /auth/me  

### Users
- POST   /users  
- GET    /users/:id  
- PATCH  /users/:id  
- DELETE /users/:id  
- GET    /users?type=CADISTA|LAB  

### Credits
- POST   /credits  
- GET    /credits  
- GET    /credits/:id  
- DELETE /credits/:id  
- GET    /credits/balance/:labId  

### Jobs
- POST   /jobs  
- GET    /jobs  
- GET    /jobs/:id  
- PATCH  /jobs/:id  
- DELETE /jobs/:id  

### Transactions
- POST   /transactions  
- GET    /transactions  
- GET    /transactions/:id  
- DELETE /transactions/:id  

### Skills
- POST   /skills  
- GET    /skills  
- DELETE /skills/:id  

---

## 🧪 Testes

1. Comprar crédito:  
   POST /credits  
   { "labId":"<LAB_ID>", "type":"CROWN", "quantity":10 }  
2. Criar job:  
   POST /jobs  
   { "title":"Teste", "type":"CROWN", "briefing":"...", "originalFile":"f.zip", "urgent":false, "deliveryDate":"2025-07-01T00:00:00Z", "value":200, "labId":"<LAB_ID>", "skills":["<SKILL_ID>"] }  
3. Ver saldo: GET /credits/balance/<LAB_ID>  
4. Listar transações: GET /transactions  

---

Todos os direitos reservados à Clinica Odontológica Dentistas Prazeres 
