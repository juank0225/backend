import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Role } from '../entities/role.entity';
import { Linea } from '../entities/linea.entity';
import { User } from '../entities/user.entity';
import { Login } from '../entities/login.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepository = dataSource.getRepository(Role);
  const lineaRepository = dataSource.getRepository(Linea);
  const userRepository = dataSource.getRepository(User);
  const loginRepository = dataSource.getRepository(Login);

  try {
    console.log('Iniciando seed...');

    // 1. Roles
    let adminRole = await roleRepository.findOne({
      where: { nombreRol: 'administrador' },
    });

    if (!adminRole) {
      adminRole = roleRepository.create({
        nombreRol: 'administrador',
        descripcion: 'Acceso total al sistema',
      });
      await roleRepository.save(adminRole);
      console.log('Rol administrador creado');
    } else {
      console.log('Rol administrador ya existe');
    }

    let expertoRole = await roleRepository.findOne({
      where: { nombreRol: 'experto' },
    });

    if (!expertoRole) {
      expertoRole = roleRepository.create({
        nombreRol: 'experto',
        descripcion: 'Usuario experto de línea',
      });
      await roleRepository.save(expertoRole);
      console.log('Rol experto creado');
    } else {
      console.log('Rol experto ya existe');
    }

    // 2. Línea Tecnoparque
    let tecnoparqueLinea = await lineaRepository.findOne({
      where: { nombreLinea: 'Tecnoparque' },
    });

    if (!tecnoparqueLinea) {
      tecnoparqueLinea = lineaRepository.create({
        nombreLinea: 'Tecnoparque',
      });
      await lineaRepository.save(tecnoparqueLinea);
      console.log('Línea Tecnoparque creada');
    } else {
      console.log('Línea Tecnoparque ya existe');
    }

    // 3. Usuario administrador
    let adminUser = await userRepository.findOne({
      where: { correo: 'admin@tecnoparque.com' },
      relations: ['rol', 'linea'],
    });

    if (!adminUser) {
      adminUser = userRepository.create({
        nombre: 'Admin',
        apellido: 'Sistema',
        correo: 'admin@tecnoparque.com',
        celular: '3000000000',
        tipoDoc: 'CC',
        numDoc: '1000000001',
        estado: 'Activo',
        rol: adminRole,
        linea: tecnoparqueLinea,
      });
      await userRepository.save(adminUser);
      console.log('Usuario administrador creado');
    } else {
      console.log('Usuario administrador ya existe');
    }

    // 4. Login administrador
    let adminLogin = await loginRepository.findOne({
      where: {
        user: { id: adminUser.id },
      },
      relations: ['user'],
    });

    if (!adminLogin) {
      const hashedPassword = bcrypt.hashSync('Admin123*', 10);

      adminLogin = loginRepository.create({
        passwordHash: hashedPassword,
        user: adminUser,
        lastLogin: null,
      });

      await loginRepository.save(adminLogin);
      console.log('Login de administrador creado');
    } else {
      console.log('Login de administrador ya existe');
    }

    // 5. Usuario experto
    let expertoUser = await userRepository.findOne({
      where: { correo: 'experto@tecnoparque.com' },
      relations: ['rol', 'linea'],
    });

    if (!expertoUser) {
      expertoUser = userRepository.create({
        nombre: 'Usuario',
        apellido: 'Experto',
        correo: 'experto@tecnoparque.com',
        celular: '3000000001',
        tipoDoc: 'CC',
        numDoc: '1000000002',
        estado: 'Activo',
        rol: expertoRole,
        linea: tecnoparqueLinea,
      });
      await userRepository.save(expertoUser);
      console.log('Usuario experto creado');
    } else {
      console.log('Usuario experto ya existe');
    }

    // 6. Login experto
    let expertoLogin = await loginRepository.findOne({
      where: {
        user: { id: expertoUser.id },
      },
      relations: ['user'],
    });

    if (!expertoLogin) {
      const hashedPassword = bcrypt.hashSync('Experto123*', 10);

      expertoLogin = loginRepository.create({
        passwordHash: hashedPassword,
        user: expertoUser,
        lastLogin: null,
      });

      await loginRepository.save(expertoLogin);
      console.log('Login de experto creado');
    } else {
      console.log('Login de experto ya existe');
    }

    console.log('Seed completado correctamente');
  } catch (error) {
    console.error('Error ejecutando el seed:', error);
  } finally {
    await app.close();
  }
}

seed();