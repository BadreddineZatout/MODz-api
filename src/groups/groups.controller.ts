import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/orders/guards/token.guard';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseGuards(TokenGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Get('')
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.getGroup(id);
  }
}
