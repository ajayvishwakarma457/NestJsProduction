# Complete NestJS Roadmap

## 0. Prerequisites

Learn these first:

- TypeScript
- Node.js
- Express basics
- REST API
- MongoDB or PostgreSQL
- JWT authentication
- Basic object-oriented programming
- Dependency injection concepts

NestJS is built for scalable Node.js applications, uses TypeScript heavily, and supports Express by default or Fastify optionally.

## Phase 1: NestJS Foundation

### Learn

- What NestJS is
- Nest CLI
- Project structure
- `main.ts`
- `AppModule`
- Controllers
- Services
- Providers
- Modules
- Dependency injection

### Practice Project

- Build a basic NestJS application using controllers, services, providers, and modules.

## Phase 2: REST API Properly

### Learn

- Routing
- Request parameters
- Query parameters
- Request body
- DTOs
- `ValidationPipe`
- `class-validator`
- `class-transformer`
- HTTP status codes
- Exception handling

### Practice Project

- Build a validated CRUD REST API with proper exception handling.

## Phase 3: Database

Learn one ORM first:

- **Option A: Prisma** - Best for modern TypeScript projects.
- **Option B: TypeORM** - Common in NestJS documentation and community.

### Learn

- Database connection
- Models and entities
- Repositories
- Migrations
- Relations
- Transactions
- Pagination
- Filtering
- Search

### Practice Project

- Build a User, Product, and Order API.

## Phase 4: Authentication & Authorization

### Learn

- Password hashing
- Login and registration
- JWT
- Refresh tokens
- Guards
- Role-based access
- Permission-based access
- Current-user decorator

### Practice Project

- Build an authentication system with Admin and User roles.

## Phase 5: Core NestJS Architecture

This is where beginners usually become weak. Learn how each component fits into the NestJS request lifecycle.

### Learn

- Middleware
- Guards
- Pipes
- Interceptors
- Filters
- Custom decorators
- Dynamic modules
- Global modules
- Config module

Middleware runs before route handlers and has access to the request, response, and `next`.

### Practice Project

- Logging middleware
- Authentication guard
- Response interceptor
- Global exception filter

## Phase 6: File Uploads & Background Jobs

### Learn

- Multer file upload
- Cloudinary or S3 upload
- Queues
- BullMQ
- Redis
- Background email jobs
- Retrying failed jobs

### Practice Project

- Build profile image upload with an email notification queue.

## Phase 7: Testing

### Learn

- Unit testing
- Service testing
- Controller testing
- Mocking providers
- End-to-end testing
- Test database

### Practice Project

- Write tests for the Auth and User modules.

## Phase 8: API Documentation

### Learn

- Swagger and OpenAPI
- DTO documentation
- Authentication in Swagger
- API versioning

### Practice Project

- Generate complete Swagger documentation for your API.

## Phase 9: Advanced API Patterns

### Learn

- Pagination
- Sorting
- Filtering
- Search
- Rate limiting
- Caching
- Idempotency
- Request logging
- Audit logs

### Practice Project

- Add advanced API patterns to an existing production-style API.

## Phase 10: WebSockets

### Learn

- Gateway
- Socket events
- Rooms
- Authenticated sockets
- Real-time notifications
- Chat system

### Practice Project

- Build a real-time chat application.

## Phase 11: GraphQL

### Learn

- Code-first GraphQL
- Resolvers
- Queries
- Mutations
- Input types
- Authentication guards in GraphQL
- DataLoader

### Practice Project

- Build a GraphQL User and Post API.

## Phase 12: Microservices

### Learn

- Message patterns
- Event patterns
- TCP transport
- Redis transport
- RabbitMQ or Kafka
- `ClientProxy`
- Timeouts
- Retry handling

NestJS microservices use message and event patterns, and `send()` returns an RxJS Observable.

### Practice Project

- Build Auth, Order, and Notification services.

## Phase 13: Production & Deployment

### Learn

- Environment configuration
- Docker
- Docker Compose
- Nginx
- PM2
- CI/CD
- GitHub Actions
- Logging
- Health checks
- Metrics
- Sentry
- OpenTelemetry
- Rate limits
- Security headers

### Practice Project

- Deploy a NestJS API with Docker, Nginx, and PostgreSQL.

## Phase 14: Enterprise Architecture

### Learn

- Clean Architecture
- Hexagonal Architecture
- Domain-driven design basics
- Modular monolith design
- Feature-based modules
- Shared modules
- Repository pattern
- Use-case pattern
- Event-driven design

### Practice Project

- Build a modular e-commerce backend.
