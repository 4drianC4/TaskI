export type UserDTO = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  name?: string;
  systemRoleId: string;
};

export type UpdateUserInput = {
  email?: string;
  name?: string | null;
};