import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { MarkupService } from './markup.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { ConversationService } from '../conversation/conversation.service';
import { UpdateMarkupDto } from './dto/update-markup.dto';
@ApiTags('Markup')
@Controller('v1/api')
export class MarkupController {
  constructor(private readonly markupService: MarkupService,
    private readonly conversationService: ConversationService) { }

  // @Post('markup/:uid')
  // async create(@Param('uid') uid: number, @Body() createMarkupDto: CreateMarkupDto) {
  //   const res = await this.markupService.create(uid, createMarkupDto);
  //   console.log('res', res)
  // }
  @Post('markup/:uid')
  async create(@Param('uid') uid: number, @Body() createMarkupDto: CreateMarkupDto) {

    // Create a new Markup record
    if (!createMarkupDto?.url) {
      throw new BadRequestException('Url is required');
    }
    const markup = await this.markupService.create(uid, createMarkupDto);
    // Return the created Markup and Conversation
    return markup;
  }


  @Get('user/:uid/markup')
  async findProjectsByUserId(@Param('uid') uid: number) {
    const markups = await this.markupService.findMarkupsByUserId(uid);
    const markupsWithConversationCount = await Promise.all(markups.map(async (markup) => {
      const totalConvo = await this.markupService.getConversationCount(markup.id);
      return { ...markup, totalConvo };
    }));
    return { uid, markups: markupsWithConversationCount };
  }

  @Get('markup/:id')
  async getConversationAndThreadsByMarkupId(@Param('id') markupId: number) {
    const markupWithDetails = await this.conversationService.getConversationAndThreadsByMarkupId(markupId);
    return markupWithDetails;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMarkupDto: UpdateMarkupDto) {
  //   return this.markupService.update(+id, updateMarkupDto);
  // }

  @Delete('markup/:id')
  remove(@Param('id') id: string) {
    return this.markupService.remove(+id);
  }
}
