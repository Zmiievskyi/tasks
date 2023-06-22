export default class Task {
  id?:number
  name: string;
  content: string;
  categoryId: number | string | undefined;
  constructor( id:number,name: string, content: string, categoryId: number | string | undefined) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.categoryId = categoryId;
  }
}
