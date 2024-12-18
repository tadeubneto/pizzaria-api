import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService){}


    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({
            data: createCategoryDto,
        })
    }

    findAll() {
        return this.prisma.category.findMany()
    }

    async findOne(id: number){
        const category = await this.prisma.category.findUnique({
            where: { id },
        })

        if(!category) {
            throw new NotFoundException(`Categoria com ID ${id} não encontrada`)
        }

        return category
    }

    async update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
        try{            
            const category = await this.prisma.category.update({
                where: { id },
                data: UpdateCategoryDto,                
            })
        }catch(error){
            throw new NotFoundException(`Categoria com ID ${id} não encontrada`)
        }
    }

    async remove(id: number){
        try{
            return this.prisma.category.delete({
                where: {id}
            })
        }catch(error){
            throw new NotFoundException(`Categoria com o ID ${id} não encontrada`)
        }
    }
}
