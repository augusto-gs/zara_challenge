import { getPhones } from '@/lib/api/phones';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get('search') ?? undefined;

  try {
    const phones = await getPhones(search);
    return NextResponse.json(phones);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch phones', message: String(error) },
      { status: 500 }
    );
  }
}
