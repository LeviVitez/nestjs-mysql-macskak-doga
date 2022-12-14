/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macskak.dto';
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  async index(@Query('szem_szin') szem_szin: string) {
    if (szem_szin != undefined) {
      const [rows] = await db.execute(
        'SELECT szem_szin, suly FROM macskak WHERE szem_szin = ?',
        [szem_szin],
      );
      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC',
      );
      return {
        macskak: rows,
      };
    }
  }
  @Get('cats/new')
  @Render('form')
  newMacskaForm() {
    return {};
  }
  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() macskak: MacskaDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macskak.szem_szin, macskak.suly],
    );
    return {
      url: '/',
    };
  }
}
