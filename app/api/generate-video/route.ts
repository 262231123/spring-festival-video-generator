import { NextRequest, NextResponse } from 'next/server';
import { getStyleById, getArtStyleById, buildPrompt } from '@/data/styles';
import axios from 'axios';

const API_KEY = 'a98d791a-f12b-4d75-b030-6fd0dcba033a';
const API_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const styleId = formData.get('styleId') as string;
    const artStyleId = formData.get('artStyleId') as string;

    if (!imageFile || !styleId) {
      return NextResponse.json(
        { error: 'Missing image or styleId' },
        { status: 400 }
      );
    }

    const style = getStyleById(styleId);
    if (!style) {
      return NextResponse.json(
        { error: 'Invalid styleId' },
        { status: 400 }
      );
    }

    const artStyle = artStyleId ? getArtStyleById(artStyleId) : undefined;

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = imageFile.type || 'image/jpeg';
    const imageUrl = `data:${mimeType};base64,${base64}`;

    const prompt = buildPrompt(style, artStyle);

    const payload = {
      model: 'doubao-seedance-1-5-pro-251215',
      content: [
        {
          type: 'text',
          text: prompt,
        },
        {
          type: 'image_url',
          image_url: {
            url: imageUrl,
          },
        },
      ],
    };

    const response = await axios.post(API_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      timeout: 60000,
    });

    if (response.data.error) {
      return NextResponse.json(
        { error: response.data.error.message },
        { status: 400 }
      );
    }

    const taskId = response.data.id;

    return NextResponse.json({
      taskId,
      status: 'pending',
    });
  } catch (error: any) {
    console.error('Error generating video:', error);
    
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data?.error?.message || error.message },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
