import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
// import { AllExceptionsFilter } from './filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        property: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]],
      }))
      return new HttpException({
        success: false,
        status: 400,
        messages: result,
        data: [],
      }, 200)
    }
  }))
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/',
  // });

  await app.listen(process.env.PORT);
}
bootstrap();
