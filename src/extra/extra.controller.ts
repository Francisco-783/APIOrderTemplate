import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto'; 
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto'; 
import { Public } from 'src/auth/auth.guard';

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body(ValidationPipe) createExtraDto: CreateExtraDto) {
    return this.extraService.createExtra(createExtraDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.extraService.findAllExtra(false);
  }

  @Get("admin")
  findAllAdmin() {
    return this.extraService.findAllExtra(true);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id' ) id: string) {
    return this.extraService.findOneExtra(id, false);
  }

  @Get('admin/:id')
  findOneAdmin(@Param('id' ) id: string) {
    return this.extraService.findOneExtra(id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateExtraDto: UpdateExtraDto) {
    return this.extraService.editExtra(id, updateExtraDto);
  }

  @Delete(':id')
  remove(
    @Param("id") id: string,
    @Query('visible') visible: string
  ) {
    const isVisible = visible === 'true';
    return this.extraService.updateExtraVisibility(id, isVisible);
  }
}
