
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 8080;
    const app = await NestFactory.create(AppModule);
    //app.enableCors()
    app.use(cors({origin: 'http://localhost:4200'}));
    await app.listen(PORT, () => {
      console.log("SERVER STARTED @PORT ",PORT)
    });
  } catch (e) {
    console.log("SERVER ERROR", e);
  }
}
bootstrap();
