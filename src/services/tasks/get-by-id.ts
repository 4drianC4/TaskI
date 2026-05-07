import { TaskService } from "./service";

export async function getById(id: string) {
    return TaskService.getById(id);
}