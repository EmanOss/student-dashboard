export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}