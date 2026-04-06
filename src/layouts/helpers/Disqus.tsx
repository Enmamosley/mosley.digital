import React, { useEffect } from "react";
import config from "@/config/config.json";

interface DisqusProps {
  className?: string;
}

const Disqus = ({ className }: DisqusProps) => {
  const { disqus } = config;

  useEffect(() => {
    if (!disqus.enable) return;

    // Reset Disqus
    const disqusConfig = (window as any).DISQUS;
    if (disqusConfig) {
      disqusConfig.reset({
        reload: true,
        config: function () {
          this.page.identifier = window.location.pathname;
          this.page.url = window.location.href;
        },
      });
    } else {
      // Load Disqus script
      const script = document.createElement("script");
      script.src = `https://${disqus.shortname}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", String(+new Date()));
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!disqus.enable) return null;

  return (
    <div className={className}>
      <div id="disqus_thread" />
    </div>
  );
};

export default Disqus;
