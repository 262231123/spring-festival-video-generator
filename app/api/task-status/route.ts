import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = 'a98d791a-f12b-4d75-b030-6fd0dcba033a';
const API_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { error: 'Missing taskId' },
        { status: 400 }
      );
    }

    const response = await axios.get(`${API_ENDPOINT}/${taskId}`, {
      headers: {
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

    const result = response.data;
    let videoUrl: string | undefined;

    if (result.status === 'succeeded') {
      if (result.content && result.content.video_url) {
        videoUrl = result.content.video_url;
      }
    }

    return NextResponse.json({
      status: result.status,
      videoUrl,
      error: result.error?.message,
    });
  } catch (error: any) {
    console.error('Error checking task status:', error);
    
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
