import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() as string
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return new NextResponse('Article not found', { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() as string
  try {
    const body = await request.json();
    const { title, content, published } = body;

    const article = await prisma.article.update({
      where: { id: Number(id) },
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

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() as string
  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
