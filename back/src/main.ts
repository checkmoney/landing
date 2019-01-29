import { NestFactory } from '@nestjs/core'

import setupCors from '@back/addons/cors'
import setupSwagger from '@back/addons/swagger'
import { AppModule } from '@back/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app, 'docs')
  setupCors(app)

  await app.listen(3000)
}

bootstrap()
