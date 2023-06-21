import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../tasks/tasks.model";
import { Category } from "src/categories/categories.model";

interface UserCreationAttrs {
  email: string;
  password: string;
  role?: string;
  name?: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@gmail.com", description: "Email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "ADMIN", description: "administrator or user" })
  @Column({ type: DataType.STRING, allowNull: true })
  role: string;

  @ApiProperty({ example: "John Dou", description: "Full name" })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @HasMany(() => Category)
  categories: Category;
}
