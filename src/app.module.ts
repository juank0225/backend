import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TecnoParqueModule } from './indicadores/tecnoparque/tecnoparque.module';
import { TecnoAcademiaModule } from './indicadores/tecnoacademia/tecnoacademia.module';
import { LaboratorioModule } from './indicadores/laboratorio/laboratorio.module';
import { InvestigacionModule } from './indicadores/investigacion/investigacion.module';

import { Nodo } from './entities/nodo.entity';
import { Linea } from './entities/linea.entity';
import { NodosController } from './nodos.controller';
import { NodosService } from './nodos.service';
import { LineasController } from './lineas.controller';
import { LineasService } from './lineas.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin123456$',
      database: 'sistema_indicadores',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Nodo, Linea]),
    AuthModule,
    TecnoParqueModule,
    TecnoAcademiaModule,
    LaboratorioModule,
    InvestigacionModule,
  ],
  controllers: [AppController, NodosController, LineasController],
  providers: [AppService, NodosService, LineasService],
})
export class AppModule { }