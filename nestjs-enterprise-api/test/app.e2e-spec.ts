import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import request from 'supertest';
import { AppModule } from './../src/app.module';

interface HealthResponse {
  status: string;
  info: { database: { status: string } };
}

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/v1/health (GET)', () => {
    const server = app.getHttpServer() as Server;

    return request(server)
      .get('/api/v1/health')
      .expect(200)
      .expect(({ body }: { body: HealthResponse }) => {
        expect(body.status).toBe('ok');
        expect(body.info.database.status).toBe('up');
      });
  });
});
