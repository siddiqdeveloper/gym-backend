import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities/entity';
import { MasterModule } from './master/master.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { UserModule } from './user/user.module';
import { MemberController } from './member.controller';
import { PackageController } from './package.controller';
import { MemberService } from './member.service';
import { PackageService } from './package.service';
import { Member } from './entities/Member.entity';
import { Package } from './entities/Package.entity';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { Lead } from './entities/Lead.entity';


@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,

    //   host: 'redis-13986.c301.ap-south-1-1.ec2.cloud.redislabs.com',
    //   port: 13986,
    //   username: 'default',
    //   password: 'DwGjX1vS1STq21EVII0U0WD8jkF6MLsu',
    //   no_ready_check: true,
    // }),
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
      entities: entities,
      synchronize: process.env.dbSync === 'true',
      logging: "all",
      logger:"file",
    }),
    TypeOrmModule.forFeature([Member,Package,Lead]),
    MasterModule,
    UserModule,

  ],
  controllers: [AppController,MemberController,PackageController,LeadController],
  providers: [
    AppService,
    MemberService,
    PackageService,
    LeadService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
