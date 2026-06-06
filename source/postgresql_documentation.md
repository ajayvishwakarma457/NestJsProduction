# PostgreSQL Documentation

## Local Setup

PostgreSQL is installed through Homebrew.

```text
PostgreSQL version: 18.4
Host: localhost
Port: 5432
Default database: postgres
Local user: spakcomm-ajay
Homebrew service: postgresql@18
Data directory: /opt/homebrew/var/postgresql@18
```

The local Homebrew installation allows the macOS user `spakcomm-ajay` to connect without a password.

## Service Management

Check the PostgreSQL service:

```bash
brew services list | grep postgresql
```

Start PostgreSQL:

```bash
brew services start postgresql@18
```

Stop PostgreSQL:

```bash
brew services stop postgresql@18
```

Restart PostgreSQL:

```bash
brew services restart postgresql@18
```

Check whether PostgreSQL accepts connections:

```bash
pg_isready
```

## Version Information

Check the installed `psql` client version:

```bash
psql --version
```

Check the running PostgreSQL server version:

```bash
psql -d postgres -c "SELECT version();"
```

## Connect With `psql`

Connect to the default database:

```bash
psql -d postgres
```

Connect with explicit connection details:

```bash
psql -h localhost -p 5432 -U spakcomm-ajay -d postgres
```

Exit `psql`:

```text
\q
```

## Useful `psql` Commands

These commands work inside the `psql` terminal:

```text
\l                  List databases
\c database_name    Connect to a database
\dt                 List tables
\d table_name       Describe a table
\dn                 List schemas
\du                 List roles
\conninfo           Show current connection information
\x                  Toggle expanded query output
\timing             Toggle query execution timing
\?                  Show psql command help
\q                  Exit psql
```

## DBeaver Connection

Use these settings to connect DBeaver to the local PostgreSQL server:

```text
Driver: PostgreSQL
Host: localhost
Port: 5432
Database: postgres
Username: spakcomm-ajay
Password: leave empty for the current local setup
```

Click **Test Connection**, allow DBeaver to download its PostgreSQL driver if prompted, and then click **Finish**.

### Run SQL in DBeaver

1. Right-click the `postgres` database.
2. Select **SQL Editor > New SQL Script**.
3. Write a query.
4. Press `Command + Enter` to execute the current query.

Test the connection:

```sql
SELECT version();
SELECT current_database();
SELECT current_user;
```

## Database Management

Create a database:

```sql
CREATE DATABASE nestjs_learning;
```

List databases:

```sql
SELECT datname
FROM pg_database
WHERE datistemplate = false
ORDER BY datname;
```

Rename a database:

```sql
ALTER DATABASE nestjs_learning RENAME TO nestjs_production;
```

Delete a database:

```sql
DROP DATABASE nestjs_production;
```

Do not delete a production database without a verified backup and explicit approval.

## Role Management

Create an application role:

```sql
CREATE ROLE nestjs_app
WITH LOGIN
PASSWORD 'replace-with-a-secure-password';
```

Grant database access:

```sql
GRANT CONNECT ON DATABASE nestjs_learning TO nestjs_app;
```

After connecting to `nestjs_learning`, grant schema permissions:

```sql
GRANT USAGE, CREATE ON SCHEMA public TO nestjs_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nestjs_app;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO nestjs_app;
```

Configure permissions for future tables and sequences:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO nestjs_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO nestjs_app;
```

Applications should use a dedicated application role instead of an administrator role.

## Table Fundamentals

Create a users table:

```sql
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Insert data:

```sql
INSERT INTO users (name, email)
VALUES ('Ajay', 'ajay@example.com');
```

Read data:

```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC;
```

Update data:

```sql
UPDATE users
SET name = 'Ajay Kumar',
    updated_at = NOW()
WHERE email = 'ajay@example.com';
```

Delete data:

```sql
DELETE FROM users
WHERE email = 'ajay@example.com';
```

## Transactions

Use a transaction when multiple operations must succeed or fail together:

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

Undo the current transaction:

```sql
ROLLBACK;
```

## Indexes

Create an index for frequently searched columns:

```sql
CREATE INDEX idx_users_created_at
ON users (created_at);
```

Inspect query execution:

```sql
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'ajay@example.com';
```

Indexes improve reads but consume storage and add work to inserts and updates. Add them based on measured query requirements.

## NestJS Connection

A typical local connection URL is:

```env
DATABASE_URL="postgresql://spakcomm-ajay@localhost:5432/nestjs_learning"
```

For an application role with a password:

```env
DATABASE_URL="postgresql://nestjs_app:secure-password@localhost:5432/nestjs_learning"
```

Do not commit real database credentials to Git. Store them in environment variables or a secret manager.

## Prisma Commands

Initialize Prisma:

```bash
npx prisma init
```

Create and apply a development migration:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

Inspect database data with Prisma Studio:

```bash
npx prisma studio
```

Apply existing migrations in production:

```bash
npx prisma migrate deploy
```

## Backup & Restore

Create a compressed database backup:

```bash
pg_dump -Fc -d nestjs_learning -f nestjs_learning.dump
```

Restore a compressed backup:

```bash
createdb nestjs_learning_restored
pg_restore -d nestjs_learning_restored nestjs_learning.dump
```

Create a plain SQL backup:

```bash
pg_dump -d nestjs_learning -f nestjs_learning.sql
```

Restore a plain SQL backup:

```bash
psql -d nestjs_learning_restored -f nestjs_learning.sql
```

Backups are only reliable after the restore process has been tested.

## Monitoring & Troubleshooting

Show active connections and queries:

```sql
SELECT pid, usename, datname, state, query_start, query
FROM pg_stat_activity
ORDER BY query_start;
```

Show database sizes:

```sql
SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;
```

Show table sizes:

```sql
SELECT
  schemaname,
  relname,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

Check whether port `5432` is listening:

```bash
lsof -nP -iTCP:5432 -sTCP:LISTEN
```

## Production Practices

- Use migrations for every schema change.
- Use separate databases for development, testing, staging, and production.
- Use dedicated application roles with minimum required permissions.
- Keep credentials in environment variables or secret managers.
- Use parameterized queries to prevent SQL injection.
- Enable SSL for remote database connections.
- Restrict database network access.
- Configure automated backups and test restores.
- Monitor slow queries, connections, storage, and replication.
- Use transactions for related data changes.
- Add indexes based on real query performance.
- Avoid manually editing production schemas or data.
- Prefer managed PostgreSQL services for production unless the team can operate PostgreSQL reliably.
