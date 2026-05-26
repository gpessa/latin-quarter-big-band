"use client";

import { useCallback } from "react";
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

export function SortedConcertsInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault } = props;

  const handleChange = useCallback(
    (patch: FormPatch | PatchEvent | FormPatch[]) => {
      onChange(patch);

      const items = (props.value ?? []) as ConcertItem[];
      if (items.length < 2) return;

      const sorted = [...items].sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
      });

      const needsSort = sorted.some(
        (item, i) => item._key !== items[i]._key
      );

      if (needsSort) {
        setTimeout(() => {
          onChange(PatchEvent.from(set(sorted)));
        }, 300);
      }
    },
    [onChange, props.value]
  );

  return renderDefault({ ...props, onChange: handleChange });
}
