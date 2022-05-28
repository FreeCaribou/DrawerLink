import { Controller, Delete, Get, Headers, Param, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DrawersService } from "./drawers.service";
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/role.enum';
import { CreateDrawerDto } from "./dto/create-drawer.dto";

@ApiTags('Drawer')
@Controller('drawers')
export class DrawersController {

  constructor(
    private readonly drawersService: DrawersService
  ) { }

  @Auth(RoleEnum.Connected)
  @Get()
  findAllByUser(@Headers() header) {
    return this.drawersService.findAllByUser(header.user_token);
  }

  @Auth(RoleEnum.Connected)
  @Delete('/:uuid')
  deleteOne(@Param('uuid') uuid: string, @Headers() header) {
    return this.drawersService.deleteOne(uuid, header.user_token);
  }

  @Auth(RoleEnum.Connected)
  @Post()
  create(@Body() createDrawerDto: CreateDrawerDto, @Headers() header) {
    return this.drawersService.create(createDrawerDto, header.user_token);
  }
}