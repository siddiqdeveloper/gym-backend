import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException, Req, Res } from '@nestjs/common';
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
      console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to create member',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }


 

  // Get a member by ID
  @Get('get/:id')
  async findOne(@Param('id') id: number) {
  
    try {
      const data = await this.memberService.findOne(id);
      console.log('data',data)
      return {
        status: true,
        message: 'Member retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving member:', error);
      throw new HttpException({
        status: false,
        message: 'Failed to retrieve member',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
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
      throw new HttpException({
        status: false,
        message: 'Failed to retrieve members',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
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
      throw new HttpException({
        status: false,
        message: 'Failed to update member',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
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
      throw new HttpException({
        status: false,
        message: 'Failed to delete member',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to generate member code',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('status/:id')
async updateStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
  try {
    const data = await this.memberService.updateStatus(id, body.isActive);
    return {
      status: true,
      message: 'Member status updated successfully',
      data: data,
    };
  } catch (error) {
    console.log(error)
    throw new HttpException({
      status: false,
      message: 'Failed to update member status',
      error: error.message,
    }, HttpStatus.BAD_REQUEST);
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
    throw new HttpException({
      status: false,
      message: 'Failed to retrieve InterstedIn',
      error: error.message,
    }, HttpStatus.BAD_REQUEST);
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




}
