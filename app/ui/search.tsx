'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm] = useDebounce(searchInput, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const searchTermFromParams = params.get('query');

    if (searchTermFromParams === searchTerm) {
      return;
    }

    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }

    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams, searchTerm]);

  const handleInput = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={searchInput}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
