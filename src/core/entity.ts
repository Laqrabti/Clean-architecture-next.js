// src/core/entities/user.entity.ts
export interface User {
  id?: number;
  email: string;
  name: string;
  createdAt?: Date;
}