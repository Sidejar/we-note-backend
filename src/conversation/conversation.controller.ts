import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('conversation')
@Controller('v1/api/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post(':mid')
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @Param('mid') mid: number,
  ) {
    try {
      const conversation = await this.conversationService.createConversation(
        createConversationDto,
        mid,
      );
      return conversation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle the case where the associated markup is not found
        return { error: error.message };
      }
      // Handle other errors
      return { error };
    }
  }

  @Get(':id')
  async findOneWithThreads(@Param('id') id: string) {
    try {
      const conversation = await this.conversationService.findOneWithThreads(
        +id,
      );
      return conversation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      return { error: 'Error retrieving conversation' };
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
