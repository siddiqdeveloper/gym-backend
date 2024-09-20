import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private us: UserService,
    private configService: ConfigService,
   
  ) {}

  async login(payload) {
    console.log(payload,'payload1')
    const user:any = await this.us.findByEmail(payload.email);

   
    if (!user) {
      throw new BadRequestException('Invalid email address');
    }
    if (!user.password) {
      throw new BadRequestException('Unable to Authenticate');
    }

    if (await bcrypt.compare(payload.password, user.password)) {


      const jwt =  await this.jwtService.signAsync(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          { secret: this.configService.get('JWT_SECRET'),expiresIn:'24h' },
      );
      const result = instanceToPlain(user);
      //console.log(result);
      result.jwt = jwt;
      // const updateTokenUser = await createQueryBuilder()
      //   .update('users')
      //   .set({ remember_token: jwt })
      //   .where('id = :id', { id: result.id })
      //   .execute();
    console.log(result,'result')
      if(result?.status?.toString()==='1'){
        console.log(payload,'payload')
       await this.saveLoginInfo(payload)
      }

      return result;
   







    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async signup(payload:any) {
    const user: any = await this.us.findByEmail(payload.email);

    if (user) {
      throw new BadRequestException('Email has been taken');
    }
    payload.first_name = payload.name;
    payload.last_name = '';
    payload.password = await bcrypt.hash(payload.password, 10);
    const result = await this.us.createNewUser(payload);
    return { email: result.email, user: result.first_name };
  }

async saveLoginInfo(body:any) {
console.log(body,'loginPayload')
    const name = body.email.split('@')[0];
    console.log(name)
    const loginPayload = {

      activity_log: `${body.email} logged-in `,
        process_type: 'Log-In',
        user_email: `${body.email}`,
        module:'SAGEO-System',
        user_name:name


    }
    console.log(loginPayload,'loginPayload')





    // await this.sl.saveSystemLogs(loginPayload)




}





}


