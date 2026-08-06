import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { DesignationRepository } from './repository/designation.repository';

@Module({
  imports: [PrismaModule],

  controllers: [DesignationController],

  providers: [
    DesignationService,
    DesignationRepository,
  ],

  exports: [
    DesignationService,
    DesignationRepository,
  ],
})
export class DesignationModule {}