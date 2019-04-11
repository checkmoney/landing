import { Body, Controller, Get, Put, Query, Param } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { ProfileEditor } from '@back/user/application/ProfileEditor'
import { UserRepository } from '@back/user/domain/UserRepository'
import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'

import { ProfileRequest } from '../request/ProfileRequest'
import { ProfileResponse } from '../response/ProfileResponse'
import { OnlyForUsers } from '../security/OnlyForUsers'
import { CurrentUser } from '../decorator/CurrentUser'
import { TokenPayload } from '@back/user/application/dto/TokenPayload'
import { Currency } from '@shared/enum/Currency'

@Controller('user/profile')
@OnlyForUsers()
@ApiUseTags('user')
@ApiBearerAuth()
export class ProfileController {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly profileEditor: ProfileEditor,
  ) {}

  @Get()
  @ApiOperation({ title: 'Show user profile' })
  @ApiOkResponse({
    description: 'Fetching profile success',
    type: ProfileResponse,
  })
  public async showProfile(
    @CurrentUser() user: TokenPayload,
  ): Promise<ProfileResponse> {
    return this.getResponseByLogin(user.login)
  }

  @PostNoCreate()
  @ApiOperation({ title: 'Edit user profile' })
  @ApiOkResponse({ description: 'Editing profile success' })
  public async editProfile(
    @Body() request: ProfileRequest,
    @CurrentUser() user: TokenPayload,
  ): Promise<void> {
    await this.profileEditor.edit(user.login, request)
  }

  @PostNoCreate('/set-currency/:currency')
  @ApiOperation({ title: 'Set default currency' })
  @ApiOkResponse({ description: 'Setting default currency' })
  public async setDefaultCurrency(
    @Param('currency') currency: Currency,
    @CurrentUser() user: TokenPayload,
  ): Promise<void> {
    await this.profileEditor.changeCurrency(user.login, currency)
  }

  private async getResponseByLogin(login: string): Promise<ProfileResponse> {
    const user = await this.userRepo.getOne(login)

    return ProfileResponse.fromProfile(user.profile)
  }
}
