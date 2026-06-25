import { getPhones } from '@/lib/api/phones';
import { NextRequest, NextResponse } from 'next/server';
import { deduplicatePhones } from '@/lib/utils/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get('search') ?? undefined;

  try {
    const phones = await getPhones(search);
    const uniquePhones = deduplicatePhones(phones).slice(0, 20);
    return NextResponse.json(uniquePhones);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch phones', message: String(error) },
      { status: 500 }
    );
  }
}
