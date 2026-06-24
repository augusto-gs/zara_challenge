import { getPhoneById } from '@/lib/api/phones';
import { PhoneDetail } from '@/components/phone-detail/PhoneDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: PageProps) {
  const { id } = await params;
  const phone = await getPhoneById(id);

  return <PhoneDetail phone={phone} />;
}
