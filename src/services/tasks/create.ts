import { TaskService } from "./service";
import { CreateTaskDTO } from "@/types/task";

export async function create(data: CreateTaskDTO) {
    if (!data.title || !data.column_id) {
        throw new Error("title y column_id son requeridos");
    }
    return TaskService.create(data);
}