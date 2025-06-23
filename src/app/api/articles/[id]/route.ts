import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(params.id) },
    });

    if (!article) {
      return new NextResponse('Article not found', { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { title, content, published } = body;

    const article = await prisma.article.update({
      where: { id: Number(params.id) },
      data: {
        title,
        content,
        published,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await prisma.article.delete({
      where: { id: Number(params.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
