import React from "react";

const IconButton = ({
  children,
  href,
  classNames = "",
  variant = "filled",
}: {
  children: React.ReactNode;
  href?: string;
  classNames?: string;
  variant?: "outline" | "filled";
}) => {
  let css;
  if (variant === "filled") {
    css = {
      background:
        "linear-gradient(rgb(59, 130, 246) 0%, rgb(29, 78, 216) 100%)",
      opacity: 1,
    };
  } else {
    css = {
      background:
        "linear-gradient(rgba(59, 130, 246, 0) 0%, rgba(29, 78, 216, 0) 100%)",
      opacity: 1,
      boxShadow:
        "rgba(59, 130, 246, 0.12) -4px -6px 25px 0px inset, rgba(29, 78, 216, 0.24) 4px 4px 10px 0px inset",
      color: "#2563eb",
      border: "1px solid rgba(37, 99, 235, 0.5)",
    };
  }
  return href ? (
    <a
      href={href}
      className={` py-3.5 px-6 rounded-full text-light font-semibold relative overflow-hidden inline-block group cursor-pointer ${classNames}`}
      style={css}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(128deg, rgba(29, 78, 216, 0) 53%, rgba(29, 78, 216, 0.3) 96%)",
          opacity: 0.1,
        }}
      />
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-x-2 transition-transform duration-500 ease-in-out group-hover:-translate-y-12 scale-100 group-hover:scale-75">
          {children}
        </div>
        <div className="flex items-center justify-center gap-x-2 absolute inset-0 translate-y-12 transition-transform duration-500 ease-in-out group-hover:translate-y-0 scale-75 group-hover:scale-100">
          {children}
        </div>
      </div>
    </a>
  ) : (
    <button
      className={` py-3.5 px-6 rounded-full text-light font-semibold relative overflow-hidden inline-block group ${classNames} cursor-pointer`}
      style={css}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(128deg, rgba(29, 78, 216, 0) 53%, rgba(29, 78, 216, 0.3) 96%)",
          opacity: 0.1,
        }}
      />
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-x-2 transition-transform duration-500 ease-in-out group-hover:-translate-y-12 scale-100 group-hover:scale-75">
          {children}
        </div>
        <div className="flex items-center justify-center gap-x-2 absolute inset-0 translate-y-12 transition-transform duration-500 ease-in-out group-hover:translate-y-0 scale-75 group-hover:scale-100">
          {children}
        </div>
      </div>
    </button>
  );
};

export default IconButton;
