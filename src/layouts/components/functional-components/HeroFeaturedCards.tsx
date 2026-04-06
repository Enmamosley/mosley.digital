import { markdownify } from "@/lib/utils/textConverter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

interface Feature {
  title: string;
  icon: string;
}

const HeroFeaturedCards = ({ features }: { features: Feature[] }) => {
  const rotateArr = [-12, 7, -12, 7];
  const translateArr = [4, 7, 5, 1];

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      const cleanups: Array<() => void> = [];

      features.forEach((_, index) => {
        const card = `.hero-feature-card-${index}`;

        gsap.fromTo(
          card,
          {
            y: 150,
            rotate: 0,
            force3D: true,
          },
          {
            y: translateArr[index] ?? 0,
            rotate: rotateArr[index] ?? 0,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: ".hero-features-wrapper",
              start: "top 95%",
              end: "center 60%",
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
            },
          },
        );

        const cardElement = document.querySelector(card);
        if (cardElement) {
          const onMouseEnter = () => {
            gsap.to(card, {
              y: (translateArr[index] ?? 0) - 20,
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
            });
          };

          const onMouseLeave = () => {
            gsap.to(card, {
              y: translateArr[index] ?? 0,
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
            });
          };

          cardElement.addEventListener("mouseenter", onMouseEnter);
          cardElement.addEventListener("mouseleave", onMouseLeave);

          cleanups.push(() => {
            cardElement.removeEventListener("mouseenter", onMouseEnter);
            cardElement.removeEventListener("mouseleave", onMouseLeave);
          });
        }
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }
  }, [features]);

  if (!features?.length) return null;

  return (
    <div className="hero-features-wrapper flex items-center justify-center xl:w-266 mx-auto md:translate-y-12 flex-col md:flex-row gap-y-6">
      {features.map((feature: Feature, index: number) => {
        const uniqueKey = `hero-feature-${index}-${feature.icon.split("/").pop()?.split(".")[0] || index}`;
        return (
          <div
            key={uniqueKey}
            className={`hero hero-feature-card hero-feature-card-${index} bg-light pt-9 px-8 pb-10 rounded-3xl card-shadow flex flex-col gap-y-23 transform will-change-transform origin-center h-full w-full md:w-71.5 shrink-0 md:-ml-8 first:ml-0 cursor-pointer`}
          >
            <div className="flex justify-between">
              <img
                src={feature.icon}
                width={300}
                height={200}
                alt={feature.title}
                className="w-20 h-20 object-contain"
                loading="eager"
                decoding="async"
              />
              <em className="font-secondary text-text-dark/60 text-3xl italic">
                0{index + 1}
              </em>
            </div>
            <h3
              className="prose-em:font-light prose-em:text-primary has-em leading-10 prose-em:uppercase"
              dangerouslySetInnerHTML={{ __html: markdownify(feature.title) as string }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroFeaturedCards;
