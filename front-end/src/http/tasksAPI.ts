import axios from "axios";
import Task from "../models/task";

export default class TasksAPI {
  static async getTasks(categoryId: string | undefined) {
    try {
      const response = await axios.get(`/tasks/${categoryId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getTask(taskId: number) {
    try {
      const response = await axios.get(`/tasks/task/${taskId}`);
      return response.data;
    } catch (error) {}
  }

  static async createTask(task: Task) {
    try {
      const response = await axios.post("/tasks", task);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTask(task: Task) {
    try {
      const response = await axios.put(`/tasks/${task.id}`, task);
      return response.data;
    } catch (error) {}
  }

  static async deleteTask(taskId: number) {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {}
  }
}
