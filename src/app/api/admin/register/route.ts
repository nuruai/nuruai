import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new NextResponse('Username and password are required', { status: 400 });
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return new NextResponse('Username already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Admin created successfully', admin: newAdmin }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 