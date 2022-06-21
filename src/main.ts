import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from "dotenv";
import { setupSwagger } from './util/swagger';

dotenv.config({
  path: ".env"
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.port, () => console.log(process.env.port)); 
}
bootstrap();
