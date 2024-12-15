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
      const data = await this.memberService.update(+id, member);
      return {
        status: true,
        message: 'Member updated successfully',
        data: data,
      };
    } catch (error) {
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
          message: 'Failed to Bulk Upload ',
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

}
