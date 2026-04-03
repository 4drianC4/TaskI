import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Roles
  const adminRole = await prisma.roles.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      level: "system",
      description: "Administrador del sistema",
    },
  });

  const memberRole = await prisma.roles.upsert({
    where: { name: "member" },
    update: {},
    create: {
      name: "member",
      level: "workspace",
      description: "Miembro de workspace",
    },
  });

  console.log("✅ Roles creados");

  // Usuarios
  const alice = await prisma.users.upsert({
    where: { email: "alice@taskI.com" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@taskI.com",
      system_role_id: adminRole.id,
    },
  });

  const bob = await prisma.users.upsert({
    where: { email: "bob@taskI.com" },
    update: {},
    create: {
      name: "Bob",
      email: "bob@taskI.com",
      system_role_id: memberRole.id,
    },
  });

  console.log("✅ Usuarios creados");

  // Workspace
  const workspace = await prisma.workspaces.upsert({
    where: { id: "workspace-seed-1" },
    update: {},
    create: {
      id: "workspace-seed-1",
      name: "Equipo de Desarrollo",
      description: "Workspace principal del equipo",
      owner_id: alice.id,
    },
  });

  // Miembro en workspace
  await prisma.workspaceMembers.upsert({
    where: {
      workspace_id_user_id: {
        workspace_id: workspace.id,
        user_id: bob.id,
      },
    },
    update: {},
    create: {
      workspace_id: workspace.id,
      user_id: bob.id,
      role_id: memberRole.id,
    },
  });

  console.log("✅ Workspace creado");

  // Board
  const board = await prisma.boards.upsert({
    where: { id: "board-seed-1" },
    update: {},
    create: {
      id: "board-seed-1",
      workspace_id: workspace.id,
      name: "Lanzamiento v1.0",
      state: "active",
      visibility: "workspace",
    },
  });

  console.log("✅ Board creado");

  // Columnas
  const colTodo = await prisma.columns.upsert({
    where: { id: "col-seed-1" },
    update: {},
    create: {
      id: "col-seed-1",
      board_id: board.id,
      name: "Por hacer",
      order: 1,
    },
  });

  const colDoing = await prisma.columns.upsert({
    where: { id: "col-seed-2" },
    update: {},
    create: {
      id: "col-seed-2",
      board_id: board.id,
      name: "En progreso",
      order: 2,
    },
  });

  const colDone = await prisma.columns.upsert({
    where: { id: "col-seed-3" },
    update: {},
    create: {
      id: "col-seed-3",
      board_id: board.id,
      name: "Terminado",
      order: 3,
      is_done: true,
    },
  });

  console.log("✅ Columnas creadas");

  // Tags
  const tagUrgente = await prisma.tags.upsert({
    where: { id: "tag-seed-1" },
    update: {},
    create: {
      id: "tag-seed-1",
      workspace_id: workspace.id,
      name: "Urgente",
      color: "#EF4444",
    },
  });

  const tagDiseno = await prisma.tags.upsert({
    where: { id: "tag-seed-2" },
    update: {},
    create: {
      id: "tag-seed-2",
      workspace_id: workspace.id,
      name: "Diseño",
      color: "#2563EB",
    },
  });

  console.log("✅ Tags creados");

  // Tareas
  const task1 = await prisma.tasks.upsert({
    where: { id: "task-seed-1" },
    update: {},
    create: {
      id: "task-seed-1",
      column_id: colTodo.id,
      assignee_id: bob.id,
      title: "Diseñar pantalla de login",
      description: "Crear mockup en Figma y pasarlo a Tailwind",
      order: 1,
      due_date: new Date("2026-04-10"),
    },
  });

  const task2 = await prisma.tasks.upsert({
    where: { id: "task-seed-2" },
    update: {},
    create: {
      id: "task-seed-2",
      column_id: colDoing.id,
      assignee_id: alice.id,
      title: "Configurar base de datos",
      description: "Conectar Supabase con Prisma y correr migraciones",
      order: 1,
      due_date: new Date("2026-04-05"),
    },
  });

  const task3 = await prisma.tasks.upsert({
    where: { id: "task-seed-3" },
    update: {},
    create: {
      id: "task-seed-3",
      column_id: colDone.id,
      title: "Inicializar proyecto Next.js",
      description: "Crear proyecto base con TypeScript y Tailwind",
      order: 1,
    },
  });

  console.log("✅ Tareas creadas");

  // Subtareas
  await prisma.subtasks.createMany({
    skipDuplicates: true,
    data: [
      { id: "sub-seed-1", task_id: task1.id, title: "Crear wireframe", order: 1 },
      { id: "sub-seed-2", task_id: task1.id, title: "Maquetar en Tailwind", order: 2 },
      { id: "sub-seed-3", task_id: task2.id, title: "Crear proyecto en Supabase", order: 1, is_completed: true },
      { id: "sub-seed-4", task_id: task2.id, title: "Correr migraciones", order: 2 },
    ],
  });

  console.log("✅ Subtareas creadas");

  // Comentarios
  await prisma.comments.createMany({
    skipDuplicates: true,
    data: [
      { id: "com-seed-1", task_id: task1.id, user_id: alice.id, content: "Recuerda usar los colores del sistema de diseño" },
      { id: "com-seed-2", task_id: task2.id, user_id: bob.id, content: "Ya tengo las credenciales de Supabase" },
    ],
  });

  console.log("✅ Comentarios creados");

  // Tags en tareas
  await prisma.taskTags.createMany({
    skipDuplicates: true,
    data: [
      { task_id: task1.id, tag_id: tagDiseno.id },
      { task_id: task2.id, tag_id: tagUrgente.id },
    ],
  });

  console.log("✅ Tags asignados a tareas");

  // Activity logs
  await prisma.activityLogs.createMany({
    skipDuplicates: true,
    data: [
      { id: "log-seed-1", task_id: task2.id, user_id: alice.id, action: "Tarea creada" },
      { id: "log-seed-2", task_id: task2.id, user_id: alice.id, action: "Tarea movida a En progreso" },
      { id: "log-seed-3", task_id: task3.id, user_id: alice.id, action: "Tarea marcada como terminada" },
    ],
  });

  console.log("✅ Activity logs creados");
  console.log("🎉 Seed completado con éxito");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });