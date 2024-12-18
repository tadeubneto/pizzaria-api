import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsBoolean, IsOptional, MinLength } from "class-validator"

export class CreatePizzaDto {
    @ApiProperty({ example: 'Margherita'})
    @IsString()
    @MinLength(3)
    name: string

    @ApiProperty({ example: 'Molho de toNamespacedPath, mussarela, manjericão'})
    @IsString()
    @MinLength(10)
    description: string

    @ApiProperty({ example: '45.90'})
    @IsNumber()
    price: number

    @ApiProperty({ example: true, required: false})
    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean
}