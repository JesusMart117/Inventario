export type Role = "admin" | "manager" | "user";

export interface User {
    username: string;
    password: number | string;
    role: Role;
}