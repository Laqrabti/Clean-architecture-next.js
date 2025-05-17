// src/infrastructure/http/api/users/route.ts
import { NextResponse } from 'next/server';
import { CreateUserUseCase } from '@/src/application/use-cases/create-user';
import { ZodError } from 'zod';
import { User } from '@/src/core/entity';

export async function POST(request: Request) {
  try {
    const body: User = await request.json();
    
    // Basic validation
    if (!body.email || !body.name) {
      return NextResponse.json(
        { message: 'Email and name are required' },
        { status: 400 }
      );
    }

    const useCase = new CreateUserUseCase();
    const user = await useCase.execute(body);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Handle database errors (e.g., duplicate email)
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}