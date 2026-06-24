import { getPhones } from '@/lib/api/phones';
import { PhoneList } from '@/components/phone-list/PhoneList';

export default async function Home() {
  const phones = await getPhones();
  const uniquePhones = phones.filter(
    (phone, index, self) => index === self.findIndex((p) => p.id === phone.id)
  );

  return <PhoneList initialPhones={uniquePhones} />;
}
