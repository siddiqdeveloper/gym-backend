import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';


export class CreateClientDto {
  name: string;
  description: string;
}
export class CreateProjectDto {
  name: string;
  description:string;
}
export class CreateSampleDto {}

export class CreateEquipmentDto {}

export class loginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsNumber()
  branch_id: string;

  @IsString()
  password: string;

  @IsString()
  status: string;

  // @IsArray()
  // role_assign: number;
  //
  // @IsArray()
  // role_assign: number;
}
