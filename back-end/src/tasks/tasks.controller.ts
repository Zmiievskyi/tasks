import { Body, Controller, Delete, Get, Param, Post, UploadedFile } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Delete("/:id")
  deleteTask(@Param() params:any) {
    return this.taskService.delete(params.id);
  }

  @Get("/:id")
  getAllTasks(@Param() params:any) {
    // return console.log('params', params.id);
    return this.taskService.getAll(params.id);
  }

  @Get("/task/:id")
  getTaskById(@Param() params:any) {
    return this.taskService.getTaskById(params.id);
  }

  // @Get()
  // getTasksByCategory(@Body() categoryName: string) {
  //   return this.taskService.getTasksByCategory(categoryName);
  // }


}
