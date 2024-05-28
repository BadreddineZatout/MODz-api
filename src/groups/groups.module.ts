import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupExistsConstraint } from './validators/group-exists.validator';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService, GroupExistsConstraint],
})
export class GroupsModule {}
