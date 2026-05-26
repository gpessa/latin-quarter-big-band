"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  type ArrayOfObjectsInputProps,
  type FormPatch,
  PatchEvent,
  set,
} from "sanity";

type ConcertItem = {
  _key: string;
  _type?: string;
  date?: string;
  [key: string]: unknown;
};

function sortByDateDesc(items: ConcertItem[]): ConcertItem[] {
  return [...items].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
}

function needsSort(items: ConcertItem[]): boolean {
  if (items.length < 2) return false;
  const sorted = sortByDateDesc(items);
  return sorted.some((item, i) => item._key !== items[i]._key);
}

export function SortedConcertsInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault } = props;
  const didInitialSort = useRef(false);

  useEffect(() => {
    if (didInitialSort.current) return;
    const items = (props.value ?? []) as ConcertItem[];
    if (needsSort(items)) {
      didInitialSort.current = true;
      onChange(PatchEvent.from(set(sortByDateDesc(items))));
    } else {
      didInitialSort.current = true;
    }
  }, [onChange, props.value]);

  const handleChange = useCallback(
    (patch: FormPatch | PatchEvent | FormPatch[]) => {
      onChange(patch);

      const items = (props.value ?? []) as ConcertItem[];
      if (needsSort(items)) {
        setTimeout(() => {
          onChange(PatchEvent.from(set(sortByDateDesc(items))));
        }, 300);
      }
    },
    [onChange, props.value]
  );

  return renderDefault({ ...props, onChange: handleChange });
}
