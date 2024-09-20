import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
  NotFoundException,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto, loginDto } from '../master/master.dto';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth';

@Controller('users')
export class UserController {
  constructor(private us: UserService, private as: AuthService) {}

  @Post('auth/login')
  async login(@Body() body: loginDto, @Res() res: Response) {
    try {

      const result = await this.as.login(body);
      if (result) {
        return res
          .send({
            status: true,
            msg: 'Login successfully',
            user: result,
          })

          .status(201);

      } else {
        return res.send({ status: false, msg: 'invalid request' }).status(400);
      }
    } catch (e) {
      console.log(e);
      return res.send({ status: false, msg: 'Error Occurred' }).status(400);
    }
  }

  @Post('auth/sign-up')
  async create(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.as.signup(body);
      if (result) {
        return res
          .send({
            status: true,
            msg: 'User Created successfully',
            user: result,
          })
          .status(201);
      } else {
        return res.send({ status: false, msg: 'invalid request' }).status(400);
      }
    } catch (e) {
      console.log(e);
      return res.send({ status: false, msg: 'Error Occurred' }).status(400);
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async me(@Req() req: any, @Res() res: Response) {
    const payload: any = req.user;
    const user = await this.us.getUserInfo(payload.email);
    return res.send(user);
  }

}
