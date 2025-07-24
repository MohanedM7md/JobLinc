import { useCallback, useEffect, useRef } from "react";
import { checkUniqueSlug } from "@services/api/companyServices";
export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );
};

export const debouncedValidateSlug = async (
  slug: string,
  setIsSlugValidating: (isValid: boolean) => void,
) => {
  if (!slug) return;

  setIsSlugValidating(true);
  const response = await checkUniqueSlug(slug);
  if (response.status !== 200) {
    console.log("El response ", response);
    const errorMessage = response.statusText;
    throw new Error(`Validation failed: ${errorMessage}`);
  }
  return response.data.exist;
};
