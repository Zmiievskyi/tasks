import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "./tasks.model";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskRepository.create({
      ...dto,
    });
    return task;
  }

  async delete(id: number) {
    const task = await this.taskRepository.destroy({ where: { id } });
    return task;
  }

  async getAll(categoryId: any) {
    try {
      const tasks = await this.taskRepository.findAll(
        {
          where: { categoryId: categoryId },
        }
      );
      return tasks;
    } catch (error) {}
  }

  async getTasksByCategory(categoryName: string) {
    try {
      const tasks = await this.taskRepository.findAll({
        where: { name: categoryName },
      });
      return tasks;
    } catch (error) {}
  }

  async getTaskById(id: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      return task;
    } catch (error) {}
  }

}
