import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,    
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreatePizzaDto } from './dto/create-pizza.dto'
import { UpdatePizzaDto } from './dto/update-pizza.dto'
import { PizzasService } from './pizzas.service'

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
    constructor (private readonly pizzasService: PizzasService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova pizza'})
    @ApiResponse({ status: 201, description: 'Pizza criada com sucesso'})
    create(@Body() CreatePizzaDto: CreatePizzaDto) {
        return this.pizzasService.create(CreatePizzaDto)
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as pizzas'})
    findAll() {
        return this.pizzasService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma pizza pelo ID'})
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pizzasService.findOne(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma pizza'})
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePizzaDto: UpdatePizzaDto)
    {
        return this.pizzasService.update(id, updatePizzaDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma pizza'})
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.pizzasService.remove(id)
    }

}