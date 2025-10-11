import { Module } from '@nestjs/common';
import { CicloController } from './ciclo.controller';
import { CicloService } from './ciclo.service';

@Module({
  controllers: [CicloController],
  providers: [CicloService]
})
export class CicloModule {}
