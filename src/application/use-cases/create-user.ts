// src/application/use-cases/create-user.ts
import { User } from '@/src/core/entity';
import { db } from "@/src/infrastructure/database/drizzle.client"
import { users } from '../../infrastructure/database/schema';

export class CreateUserUseCase {
  async execute(user: User) {
    const [newUser] = await db.insert(users)
      .values(user)
      .returning();
    return newUser;
  }
}