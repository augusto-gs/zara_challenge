import type { PhoneItem } from '@/lib/types/phones';

export const deduplicatePhones = (phones: PhoneItem[]): PhoneItem[] => {
  return phones.filter(
    (phone, index, self) => index === self.findIndex((p) => p.id === phone.id)
  );
};
