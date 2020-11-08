import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      console.log("SERVER STARTED @PORT ",PORT)
    });
  } catch (e) {
    console.log("SERVER ERROR", e);
  }
}
bootstrap();
