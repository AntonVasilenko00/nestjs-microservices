import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';

describe('PrimaryController', () => {
  let primaryController: PrimaryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PrimaryController],
      providers: [PrimaryService],
    }).compile();

    primaryController = app.get<PrimaryController>(PrimaryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(primaryController.getHello()).toBe('Hello World!');
    });
  });
});
