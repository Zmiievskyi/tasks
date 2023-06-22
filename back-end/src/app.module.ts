import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import {Task} from "./tasks/tasks.model";
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { Category } from "./categories/categories.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),

        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Task, Category],
            autoLoadModels: true,
            dialectOptions: {
                ssl: {
                  require: true,
                  rejectUnauthorized: false
                }
              }
        }),
        AuthModule,
        UsersModule,
        CategoriesModule,
        TasksModule,
    ]
})
export class AppModule {}
