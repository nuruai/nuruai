import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new NextResponse('Le titre et le contenu sont requis', { status: 400 });
    }

    let imageUrl: string | undefined = undefined;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = Date.now() + '_' + imageFile.name.replace(/\s+/g, '_');
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      const imagePath = path.join(uploadDir, filename);

      // Assurez-vous que le répertoire de téléversement existe
      const fs = require('fs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await writeFile(imagePath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        image: imageUrl,
        published: true, // Ou false, selon votre logique
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return new NextResponse('Erreur Interne du Serveur', { status: 500 });
  }
}
