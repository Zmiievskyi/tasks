import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./categories.model";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create({ ...dto });
    return category;
  }

  async delete(id: number) {
    const category = await this.categoryRepository.destroy({ where: { id } });
    return category;
  }

  async getAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async update(id: number | string, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.update(
      { ...dto },
      { where: { id } }
    );
    return category;
  }
}
