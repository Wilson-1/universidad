import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionController } from './inscripcion.controller';

describe('InscripcionController', () => {
  let controller: InscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripcionController],
    }).compile();

    controller = module.get<InscripcionController>(InscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
