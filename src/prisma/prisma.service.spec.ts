import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: PrismaClient,
          useValue: new PrismaClient(),
        },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await service.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('enableShutdownHooks', () => {
    it.skip('should close the app on "beforeExit" event', async () => {
      const mockApp: INestApplication = {
        close: jest.fn(),
      } as any; // Create a mock instance of INestApplication

      const prismaClientMock = service as any; // Cast prismaService to any to access $on method
      console.log(prismaClientMock.$on?.mock);
      const beforeExitCallback = prismaClientMock.$on.mock.calls[0][1]; // Get the callback registered for "beforeExit" event

      await beforeExitCallback(); // Trigger the callback

      expect(mockApp.close).toHaveBeenCalled();
    });
  });
});
