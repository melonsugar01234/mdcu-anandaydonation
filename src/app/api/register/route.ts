import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest) {
  const { name, phone, email, home } = await  (req as any).json();

  if (!name || !phone || !home) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newRegister = await prisma.register.create({
      data: {
        name,
        phone,
        email: email || "", // Ensure email is a string
        home,
      },
    });
    return NextResponse.json(newRegister, { status: 201 });
  } catch (error) {
    console.error('Error creating new register:', error);
    return NextResponse.json({ error: 'Failed to create new register' }, { status: 500 });
  }
}