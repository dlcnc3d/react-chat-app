import { User } from "../types/types";

let users: User[] = [];

export const userJoin = (id: string, username: string) => {
  const user = users.find((user) => user.username === username);

  if (user) {
    return false;
  }

  users.push({ id, username });
  return true;
};

export const userLeave = (id: string) => {
  users = users.filter((user) => user.id !== id);
};

export const getUsers = () => users;
