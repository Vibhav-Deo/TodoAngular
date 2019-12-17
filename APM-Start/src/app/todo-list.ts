export class CheckListItem {
  id: number;
  description: string;
  isChecked: boolean;
}
export class TodoList {
  id: number;
  name: string;
  description: string;
  completedItems: number;
  totalItems: number;
  checkListItems: CheckListItem[];
  status: string;
  imageUrl: string;
  createdOn: string;
  dueOn: string;
}
