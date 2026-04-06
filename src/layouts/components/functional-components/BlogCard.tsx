import React from "react";
import config from "@/config/config.json";
import dateFormat from "@/lib/utils/dateFormat";
import { FaArrowRight } from "react-icons/fa6";

interface Post {
  id: string;
  data: {
    title: string;
    image: string;
    date: Date;
  };
}

interface BlogCardProps {
  data: Post;
}

const BlogCard = ({ data }: BlogCardProps) => {
  const { blog_folder } = config.settings;
  const { title, image, date } = data.data;

  return (
    <a
      href={`/${blog_folder}/${data.id}`}
      className="bg-light p-6 pb-0 rounded-[20px] flex flex-col gap-6 h-full group transition-all duration-500 overflow-hidden"
    >
      <div>
        <span className="py-1 px-3.5 inline-block border border-dark/30 rounded-full font-medium mb-4 text-text-dark">
          {date ? dateFormat(date) : ""}
        </span>
        <h2 className="font-secondary text-h4 group-hover:text-primary mb-6 transition-all duration-500 italic font-normal -tracking-normal">
          {title}
        </h2>
        <div className="bg-gradient-dark rounded-full size-10 flex items-center justify-center text-light text-2xl">
          <FaArrowRight className="transition-all duration-500 group-hover:rotate-0 -rotate-45" />
        </div>
      </div>
      <div className="w-full translate-y-1 overflow-hidden rounded-t-3xl relative h-55">
        <div className="h-full w-[50%] absolute top-0 left-0 bg-dark/50 z-1 -translate-x-full group-hover:translate-0 transition-all duration-500" />
        <div className="h-full w-[50%] absolute top-0 right-0 bg-dark/50 z-1 translate-x-full group-hover:translate-0 transition-all duration-500" />
        <img
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-full rounded-t-3xl mb-6 group-hover:scale-100 scale-110 transition-all duration-500 object-cover"
          loading="lazy"
        />
      </div>
    </a>
  );
};

export default BlogCard;
