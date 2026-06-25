import { getPhones } from '@/lib/api/phones';
import { PhoneList } from '@/components/phone-list/PhoneList';
import { deduplicatePhones } from '@/lib/utils/utils';

export default async function Home() {
  const phones = await getPhones();
  const uniquePhones = deduplicatePhones(phones).slice(0, 20);

  return <PhoneList initialPhones={uniquePhones} />;
}
