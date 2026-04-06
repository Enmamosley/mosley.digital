import React, { useEffect } from "react";
import "glightbox/dist/css/glightbox.css";

interface GalleryProps {
  children: React.ReactNode;
}

const Gallery = ({ children }: GalleryProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import GLightbox only on the client side
    import("glightbox").then((GLightboxModule) => {
      const GLightbox = GLightboxModule.default;
      const lightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        zoomable: true,
        draggable: true,
        closeEffect: "fade",
        openEffect: "zoom",
        slideEffect: "slide",
      });

      return () => {
        lightbox.destroy();
      };
    });
  }, []);

  return <>{children}</>;
};

export default Gallery;
