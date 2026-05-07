import { TaskService } from "./service";
import { UpdateTaskDTO } from "@/types/task";

export async function patch(id: string, data: UpdateTaskDTO) {
    return TaskService.patch(id, data);
}