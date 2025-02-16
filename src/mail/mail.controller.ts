import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors, Query
} from "@nestjs/common";

import { get } from 'http';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import * as twig from 'twig';
import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MailService } from "./mail.service";


@Controller('mail')
export class MailController {
  constructor(private mail: MailService) {}
}