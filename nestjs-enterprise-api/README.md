# NestJS Enterprise API

Production-oriented NestJS modular monolith using PostgreSQL and Prisma.

## Included

- Feature-based modular architecture
- PostgreSQL with Prisma migrations
- Environment validation
- Structured logging with sensitive-header redaction
- Global request validation and consistent errors
- Request IDs
- URI API versioning
- Swagger/OpenAPI documentation
- Database health check
- Users CRUD API with pagination
- Unit and end-to-end test foundations
- Docker and Docker Compose

## Architecture

```text
src/
  config/             Environment validation
  infrastructure/     Database and external integrations
  modules/            Business features
  shared/             Cross-cutting DTOs, filters, and interceptors
prisma/               Database schema and migrations
test/                 End-to-end tests
```

## Local Setup

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run start:dev
```

The default `.env.example` targets PostgreSQL running in Docker on port `5433`.

Start PostgreSQL with Docker:

```bash
docker compose up -d postgres
```

## API

```text
Swagger:      http://localhost:3000/docs
Health:       GET http://localhost:3000/api/v1/health
Create user:  POST http://localhost:3000/api/v1/users
List users:   GET http://localhost:3000/api/v1/users?page=1&limit=20
Get user:     GET http://localhost:3000/api/v1/users/:id
Update user:  PATCH http://localhost:3000/api/v1/users/:id
Delete user:  DELETE http://localhost:3000/api/v1/users/:id
```

Example request:

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H 'content-type: application/json' \
  -d '{"name":"Ajay Kumar","email":"ajay@example.com"}'
```

## Commands

```bash
npm run start:dev
npm run build
npm test
npm run test:e2e
npm run lint
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio
```

## Production Notes

- Use a dedicated database role with minimum required permissions.
- Store secrets in a secret manager, not committed environment files.
- Run `prisma migrate deploy` during controlled deployments.
- Extend modules with application/domain layers when business complexity
  justifies the additional boundaries.
- Add authentication, authorization, rate limiting, tracing, and CI/CD before
  exposing the API publicly.
