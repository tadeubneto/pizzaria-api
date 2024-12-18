import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
    constructor(private prisma: PrismaService){}

    async create(createPizzaDto: CreatePizzaDto) {
        return this.prisma.pizza.create({
            data: createPizzaDto,
        })
    }

    findAll() {
        return this.prisma.pizza.findMany()
    }

    async findOne(id: number){
        const pizza = await this.prisma.pizza.findUnique({
            where: {id},
        })

        if(!pizza) {
            throw new NotFoundException(`Pizza com o ID ${id} não encontrada`)
        }

        return pizza
    }

    async update (id: number, UpdatePizzaDto: UpdatePizzaDto) {
        try{
            const pizza = await this.prisma.pizza.update({
                where: {id},
                data: UpdatePizzaDto,
            })
        }catch(error){
            throw new NotFoundException(`Pizza com o ID ${id} não encontrada`)
        }
    }

    async remove(id: number){
        try{
            return this.prisma.pizza.delete({
                where: {id}
            })
        }catch(error){
            throw new NotFoundException(`Categoru com o ID ${id} não encontrada`)
        }
    }
}
