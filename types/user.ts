export type UserDTO = {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
};



export type CreateUserInput = {
  email: string;
  name?: string;
  systemRoleId: string;
};
