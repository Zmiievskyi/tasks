import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/categories.model";

interface TaskCreationAttrs {
  name: string;
  content: string;
  categoryId?: number | string;
}

@Table({ tableName: "tasks" })
export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number | string;

  @BelongsTo(() => Category)
  category: Category;
}
