import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const prisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(UsersService);
  });

  it('creates a user', async () => {
    const user = { id: 'user-id', name: 'Ajay', email: 'ajay@example.com' };
    prisma.user.create.mockResolvedValue(user);

    await expect(service.create(user)).resolves.toEqual(user);
  });

  it('throws when a user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('returns paginated users', async () => {
    prisma.$transaction.mockResolvedValue([[{ id: 'user-id' }], 1]);

    await expect(service.findAll({ page: 1, limit: 20 })).resolves.toEqual({
      items: [{ id: 'user-id' }],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });
  });

  it('does not hide unexpected create errors', async () => {
    prisma.user.create.mockRejectedValue(new Error('database unavailable'));

    await expect(
      service.create({ name: 'Ajay', email: 'ajay@example.com' }),
    ).rejects.not.toBeInstanceOf(ConflictException);
  });
});
