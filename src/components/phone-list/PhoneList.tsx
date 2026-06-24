'use client';

import { useState, useEffect } from 'react';
import type { PhoneItem } from '@/lib/types/phones';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { PhoneGrid } from '@/components/phone-grid/PhoneGrid';

interface PhoneList {
  initialPhones: PhoneItem[];
}

export const PhoneList = ({ initialPhones }: PhoneList) => {
  const [phones, setPhones] = useState<PhoneItem[]>(initialPhones);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  // useEffect(() => {
  //   if (debouncedSearch === '') {
  //     setPhones(initialPhones);
  //     return;
  //   }

  //   const fetchPhones = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `/api/phones?search=${encodeURIComponent(debouncedSearch)}`
  //       );
  //       const data = await response.json();
  //       setPhones(data);
  //     } catch {
  //       setPhones([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPhones();
  // }, [debouncedSearch, initialPhones]);


  useEffect(() => {
    if (debouncedSearch === '') {
      setPhones(initialPhones);
      return;
    }

    const fetchPhones = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/phones?search=${encodeURIComponent(debouncedSearch)}`
        );
        const data: PhoneItem[] = await response.json();
        const uniquePhones = data.filter(
          (phone, index, self) =>
            index === self.findIndex((p) => p.id === phone.id)
        );
        setPhones(uniquePhones);
      } catch {
        setPhones([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhones();
  }, [debouncedSearch, initialPhones]);

  
  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        resultCount={phones.length}
      />
      <PhoneGrid phones={phones} isLoading={isLoading} />
    </div>
  );
};
