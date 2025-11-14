import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  loadingType: "pagination" | "infinite";
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const useInfiniteScroll = ({
  loadingType,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingType !== "infinite") return;

    if (isFetchingNextPage || !hasNextPage) return;

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [loadingType, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return { lastElementRef };
};

export default useInfiniteScroll;
