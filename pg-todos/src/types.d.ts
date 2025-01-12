export interface TodoType {
  id: number;
  title: string;
  completed?: boolean;
  starred?: boolean;
  hidden?: boolean;
  dueAt?: Date;
  createdAt: Date;
  modifiedAt: Date;
}
