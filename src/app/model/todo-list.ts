export class TodoList {
    id: number;
    topic: string;
    description: string;
}

export interface ITodoListParam {
    topic?: string;
    description?: string;
}
