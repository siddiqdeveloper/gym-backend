import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Response } from 'express';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // Create a new member
  @Post()
  async create(@Body() member) {
    try {
      const data = await this.memberService.create(member);
      return {
        status: true,
        message: 'Member created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get a member by ID
  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.memberService.findOne(id);
      console.log('data', data);
      return {
        status: true,
        message: 'Member retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving member:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get all members

  @Get('all')
  async findAll() {
    try {
      const data = await this.memberService.findAll();
      return {
        status: true,
        message: 'Members retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve members',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Update a member by ID
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() member) {
    try {
      const data = await this.memberService.update(id, member);
      console.log(data);
      return {
        status: true,
        message: 'Member updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Delete a member by ID
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.memberService.remove(+id);
      return {
        status: true,
        message: 'Member deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: 'Failed to delete member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('fetchCode')
  async generateMemberCode() {
    try {
      const data = await this.memberService.generateMemberCode();
      return {
        status: true,
        message: 'Member code generated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to generate member code',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.memberService.updateStatus(id, body.isActive);
      return {
        status: true,
        message: 'Member status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update member status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // member InterestedIn

  @Get('getinterstedIn/:id')
  async getinterstedIn(@Param('id') id: number) {
    try {
      const data = await this.memberService.getinterstedIn(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'InterstedIn successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving InterstedIn:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve InterstedIn',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // inactive member

  @Post('getInActiveMember')
  async getInActiveMember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const data = await this.memberService.getInActiveMember(
      body.params.endDate,
    );

    res.send(data);
  }

  // inactive Member as save

  @Post('inActiveMemberSave')
  async createInActiveMember(@Body() member) {
    try {
      const data = await this.memberService.createInActiveMember(member);
      return {
        status: true,
        message: 'InActive Member created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to InActive Member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getMemberPaymentDetails')
  async getMemberPaymentDetails(@Query('id') id: number) {
    try {
      const data = await this.memberService.getMemberPaymentDetails(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'Member successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving Member:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // due Payment

  @Post('duePaymentList')
  async duePaymentList(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const data = await this.memberService.duePaymentList(body.params.memberId);

    res.send(data);
  }

  // save bulk load

  @Post('bukupload/add')
  async createbukupload(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.memberService.createbukupload(reqdata);

      return {
        status: true,
        message: 'Bulk Upload  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Bulk Upload ',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('cancel')
  async cancel(@Body() { memberId }) {
    try {
      const data = await this.memberService.cancel(memberId);
      return {
        status: true,
        message: 'Member Cancel successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to cancel member',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getBmiList/all')
  async getBmiList() {
    try {
      const data = await this.memberService.getBmiList();
      return {
        status: true,
        message: 'MemberList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving member list:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve MemberList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('saveBmiData')
  async saveBmiDate(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.memberService.saveBmiDate(reqdata);

      return {
        status: true,
        message: 'Bmi created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Date for this member and date already exists.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('bmiDelete/:id')
  async bmiDelete(@Param('id') id: number) {
    try {
      await this.memberService.bmiDelete(id);
      return {
        status: true,
        message: 'Exercise deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Exercise with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('bmistatus/:id')
  async updatebmistatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.memberService.updatebmistatus(id, body.isActive);
      return {
        status: true,
        message: 'Exercise  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Exercise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('bmi/all')
  async bmiAll() {
    try {
      const data = await this.memberService.bmiAll();
      return {
        status: true,
        message: 'Bmi retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving Bmi list:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Bmi',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('bmi/get/:id')
  async bmifindOne(@Param('id') id: number) {
    try {
      const data = await this.memberService.bmifindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'BMI successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving BMI:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve BMI',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   member Exchanger
  @Post('exchanger/add')
  async exchangerAdd(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.memberService.exchangerAdd(reqdata);
      return {
        status: true,
        message: 'Exchanger  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Exchanger',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('exchanger/update')
  async updateExchanger(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.memberService.updateExchanger(body);
      return {
        status: true,
        message: 'exchanger Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to exchanger',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('exchanger/get/:id')
  async exchangerfindOne(@Param('id') id: number) {
    try {
      const data = await this.memberService.exchangerfindOne(id);
      return {
        status: true,
        message: 'exchanger  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve exchanger with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('exchanger/all')
  async exchangerfindAll() {
    try {
      const data = await this.memberService.exchangerfindAll();
      return {
        status: true,
        message: 'exchanger retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve exchanger',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('exchangerdelete/:id')
  async exchangerdelete(@Param('id') id: number) {
    try {
      await this.memberService.exchangerdelete(id);
      return {
        status: true,
        message: 'exchanger deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete exchanger with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('exchangerstatus/:id')
  async exchangerstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.memberService.exchangerstatus(id, body.isActive);
      return {
        status: true,
        message: 'exchanger status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Salary exchanger',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('dashbaord-details')
  async dashbaordDetails() {
    try {
      const data = await this.memberService.dashbaordDetails();
      return {
        status: true,
        message: 'exchanger retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve exchanger',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('attendace-report')
  async attendaceReport() {
    try {
      const data = await this.memberService.attendaceReport();
      return {
        status: true,
        message: 'attendaceReport retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve attendaceReport',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   attendance Save

  @Post('attendance/save')
  async createMeter(@Body() body) {
    try {
      const reqdata: any = body;

      const check = await this.memberService.attendanceSave(reqdata);
      if (check.status) {
        return {
          status: true,
          data: check.data,
          message: 'Attendance Save successfully',
        };
      }else if(check.status && check.msg == 'memberjoinidate' ){}
       else {
        return {
          status: false,
          message: 'Please contact front desk and  check your joining date',
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create Attendance',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   attendance Report

  @Post('attendance/reports')
  async attendanceReport(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.memberService.attendanceReport(body);

    res.send(data);
  }

  @Get('attendance-report')
  async getAttendanceReport(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.memberService.getAttendanceReport();

    res.send(data);
  }
}
