import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import ScrollAnimation from "@/helpers/ScrollAnimation";
import config from "@/config/config.json";

interface Post {
  id: string;
  data: {
    title: string;
    image: string;
    date: Date;
    draft?: boolean;
  };
}

interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  const paginationSettings = config.settings.pagination;
  const [loadedItems, setLoadedItems] = useState<Post[]>([]);
  const [next, setNext] = useState<number>(paginationSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadItems(0, paginationSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const loadItems = (start: number, end: number) => {
    const slicedItems = posts.slice(start, end);
    setLoadedItems((prev) => [...prev, ...slicedItems]);
  };

  const loadItemsHandler = () => {
    loadItems(next, next + paginationSettings);
    setNext(next + paginationSettings);
  };

  const loadItemsFinished = posts.length === loadedItems.length;

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadedItems.length ? (
          loadedItems.map((post, index) => (
            <ScrollAnimation
              key={`blog-post-${index}-${post.id}`}
              delay={0.2 + index * 0.1}
            >
              <BlogCard data={post} />
            </ScrollAnimation>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-secondary border-r-secondary rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-4 border-transparent border-t-secondary border-l-secondary rounded-full animate-spin"
                style={{
                  animationDuration: "0.8s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-12 items-center">
        {!loadItemsFinished && (
          <button
            className="px-7 py-4.5 text-light rounded-full bg-dark text-center cursor-pointer hover:bg-primary transition-all duration-300"
            onClick={loadItemsHandler}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
