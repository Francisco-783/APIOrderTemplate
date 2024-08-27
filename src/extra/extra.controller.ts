import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto'; 
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto'; 

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body(ValidationPipe) createExtraDto: CreateExtraDto) {
    return this.extraService.createExtra(createExtraDto);
  }

  @Get()
  findAll() {
    return this.extraService.findAllExtra();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.extraService.findOneExtra(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body(ValidationPipe) updateExtraDto: UpdateExtraDto) {
    return this.extraService.editExtra(+id, updateExtraDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.extraService.deleteExtra(+id);
  }
}
