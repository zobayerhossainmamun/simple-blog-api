import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createBlogDto {
    @ApiProperty({
        example: 'Mamun',
        description: 'Blog Username',
    })
    @IsString()
    readonly username: string;

    @ApiProperty({
        example: 'Lorem Ipsum - All the facts',
        description: 'Blog Title',
    })
    @IsString()
    readonly title: string;

    @ApiProperty({
        example: 'In publishing and graphic design, Lorem ipsum is a placeholder text.',
        description: 'Blog Description',
    })
    @IsString()
    readonly description: string;
}