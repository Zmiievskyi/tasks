export default class Category {
  id: number;
  name: string;
  userID: number;
  constructor(id: number, name: string, userID: number) {
    this.id = id;
    this.name = name;
    this.userID = userID;
  }
}
