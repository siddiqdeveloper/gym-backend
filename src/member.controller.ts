import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // Create a new member
  @Post()
  create(@Body() member) {
    return this.memberService.create(member);
  }

  // Get all members
  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  // Get a member by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  // Update a member by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() member) {
    return this.memberService.update(+id, member);
  }

  // Delete a member by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.memberService.remove(+id);
  }
}
