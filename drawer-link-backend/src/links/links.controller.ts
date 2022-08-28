import { Controller, Headers, Post, Body, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/role.enum';
import { CreateLinkDto } from "./dto/create-link.dto";
import { LinksService } from "./links.service";

@ApiTags('Link')
@Controller('links')
export class LinksController {

  constructor(
    private readonly linksService: LinksService
  ) { }

  @Auth(RoleEnum.Connected)
  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @Headers() header) {
    return this.linksService.create(createLinkDto, header.user_token);
  }

  @Auth(RoleEnum.Connected)
  @Get('/tags')
  getMyTags(@Headers() header) {
    return this.linksService.getMyTags(header.user_token);
  }
}