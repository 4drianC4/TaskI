import { TaskService } from "./service";

export async function deleteTask(id: string) {
    return TaskService.delete(id);
}