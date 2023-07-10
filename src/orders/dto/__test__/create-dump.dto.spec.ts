import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateDumpDto } from '../create-dump.dto';
import { orderCreateFixture } from '../../fixtures/order.create';

describe('CreateDumpDto', () => {
  it('should validate a valid CreateDumpDto instance', async () => {
    const validData = {
      dump: JSON.stringify(orderCreateFixture),
      id: 123,
    };

    const createDumpDto = plainToClass(CreateDumpDto, validData);
    const errors = await validate(createDumpDto);

    expect(errors).toHaveLength(0);
  });

  it('should fail validation when "dump" is missing or empty', async () => {
    const invalidData = {
      id: 123,
    };

    const createDumpDto = plainToClass(CreateDumpDto, invalidData);
    const errors = await validate(createDumpDto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('dump');
  });

  it('should fail validation when "id" is missing or not an integer', async () => {
    const invalidData = {
      dump: JSON.stringify(orderCreateFixture),
      id: 'invalid',
    };

    const createDumpDto = plainToClass(CreateDumpDto, invalidData);
    const errors = await validate(createDumpDto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('id');
  });
});
