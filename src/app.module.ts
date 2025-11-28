import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TecnoParqueModule } from './indicadores/tecnoparque/tecnoparque.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'sistema_indicadores',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
    }),
    AuthModule,
    TecnoParqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}