import axios from "axios";
import Category from "../models/category";

export default class CategoriesAPI {
  static async getCategories() {
    try {
      if (!axios.defaults.headers.common.Authorization) return;
      const response = await axios.get(`/categories`);
      return response.data;
    } catch (error) {}
  }

  static async createCategory(name: string, userId: number) {
    try {
      const response = await axios.post(`/categories`, { name, userId });
      return response.data;
    } catch (error) {}
  }

  static async updateCategory(category: any, name: string) {
    try {
      const response = await axios.put(`/categories/${category.id}`, {
        ...category,
        name,
      });
      return response.data;
    } catch (error) {}
  }

  static async deleteCategory(categoryId: number) {
    try {
      const response = await axios.delete(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {}
  }
}
