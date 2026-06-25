import { getPhones } from '@/lib/api/phones';
import { PhoneList } from '@/components/phone-list/PhoneList';
import { deduplicatePhones } from '@/lib/utils/utils';

export default async function Home() {
  const phones = await getPhones();
  const uniquePhones = deduplicatePhones(phones);

  return <PhoneList initialPhones={uniquePhones} />;
}
