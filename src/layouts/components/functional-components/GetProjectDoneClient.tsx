import IconButton from "@/components/functional-components/IconButton";
import ScrollAnimation from "@/helpers/ScrollAnimation";
import { markdownify } from "@/lib/utils/textConverter";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type GetProjectDoneData = {
  enable: boolean;
  title: string;
  content: string;
  project_step: ProjectStep[];
};

type ScreenSize = {
  isLargeScreen: boolean;
  isSmallScreen: boolean;
};

type ProjectStep = {
  step_name: string;
  title: string;
  content: string;
  bullet_points?: string[];
  button?: {
    enable: boolean;
    label: string;
    link: string;
  };
  highlight_pass: {
    title: string;
    content: string;
    list: Array<{
      icon: string;
      title: string;
    }>;
  };
};

type TabButtonProps = {
  step: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

type FeatureCardProps = {
  feature: {
    icon: string;
    title: string;
  };
  index: number;
  rotate: number;
  translateX: number;
  translateY: number;
};

type StepContentProps = {
  step: ProjectStep;
  isVisible: boolean;
  animationClass: string;
  wrapperRef: (el: HTMLDivElement | null) => void;
  screenSize: ScreenSize;
};

const TabButton = memo<TabButtonProps>(({ step, index, isActive, onClick }) => (
  <li
    className={`flex items-center gap-4 p-2.5 pr-7 border rounded-full transition duration-300 cursor-pointer ${isActive
      ? "border-transparent bg-gradient-secondary"
      : "bg-light border-dark/10"
      }`}
    onClick={onClick}
  >
    <div
      className={`text-h5 sm:text-h4 font-secondary italic font-light shrink-0 rounded-full size-16 flex items-center justify-center ${isActive
        ? "bg-gradient-light text-text-dark shadow-[rgba(201,201,201,0.08)_-3.58px_-5.37px_22.37px_0px_inset,rgba(29,29,29,0.24)_3.58px_3.58px_8.95px_0px_inset]"
        : "bg-gradient-dark text-light"
        }`}
    >
      0{index + 1}
    </div>
    <h4
      className={`text-h5 sm:text-h3 has-em transition duration-300 ${isActive ? "text-light" : "text-text-dark"
        }`}
      dangerouslySetInnerHTML={{ __html: markdownify(step) }}
    />
  </li>
));

TabButton.displayName = "TabButton";

const FeatureCard = memo<FeatureCardProps>(
  ({ feature, index, rotate, translateX, translateY }) => (
    <div
      className="sm:w-90 sm:h-90 rounded-3xl bg-light p-5 sm:p-10 shrink-0 text-center transform will-change-transform origin-center shadow-xl"
      style={{
        transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
      }}
    >
      <div className="size-30 flex items-center justify-center relative mx-auto">
        <div
          className={`pass-shape absolute inset-0 size-full animate-[spin_6s_linear_infinite] pass-shape-${index + 1
            }`}
        />
        <img
          src={feature.icon}
          width={60}
          height={60}
          alt={feature.title}
          className="size-15 relative z-1"
          loading="lazy"
        />
      </div>
      <h4 className="text-text-dark mt-4 font-semibold sm:text-h4 text-2xl">
        {feature.title}
      </h4>
    </div>
  ),
);

FeatureCard.displayName = "FeatureCard";

const StepContent = memo<StepContentProps>(
  ({
    step,
    isVisible,
    animationClass,
    wrapperRef,
    screenSize,
  }) => {
    const featureTransforms = useMemo(
      () =>
        step.highlight_pass.list.map((_, i) => ({
          rotate: screenSize.isSmallScreen ? 0 : [-6.8, -1.64, 9.12][i] || 0,
          translateX: screenSize.isSmallScreen ? 0 : [190, 0, -130][i] || 0,
          translateY: screenSize.isSmallScreen ? 0 : [100, 0, 100][i] || 0,
        })),
      [step.highlight_pass.list, screenSize],
    );

    return (
      <div
        ref={wrapperRef}
        className={`bg-light rounded-4xl grid lg:grid-cols-2 overflow-hidden ${isVisible ? `absolute inset-0 ${animationClass}` : "hidden"
          }`}
      >
        <div className="p-6 sm:p-10 xl:p-20">
          <h2
            dangerouslySetInnerHTML={{ __html: markdownify(step.title) }}
            className="gradient-text mb-6"
          />
          <p className="text-lg text-text-dark mb-14">{step.content}</p>
          <ul className="flex flex-col gap-y-6 mb-8">
            {step.bullet_points?.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <img
                  src="/images/icons/check-filled-icon.svg"
                  alt="check icon"
                  width={24}
                  height={24}
                  className="size-4 shrink-0 mt-1 sm:mt-0.75"
                  loading="lazy"
                />
                <p className="font-semibold">{point}</p>
              </li>
            ))}
          </ul>
          {step.button?.enable && (
            <IconButton href={step.button.link} variant="filled">
              {step.button.label}
            </IconButton>
          )}
        </div>

        <div
          className="lg:pt-10 sm:px-10 lg:pr-10 overflow-hidden"
        >
          <div className="bg-gradient-secondary sm:rounded-4xl">
            <div className="p-6">
              <h3
                dangerouslySetInnerHTML={{
                  __html: markdownify(step.highlight_pass.title),
                }}
                className="text-h4 text-light has-em mb-4"
              />
              <p
                className="text-light/90 font-light text-xl pb-10 lg:pb-0"
                dangerouslySetInnerHTML={{
                  __html: markdownify(step.highlight_pass.content),
                }}
              />

              <div className="flex justify-center sm:flex-row flex-col lg:translate-y-25 gap-y-4">
                {step.highlight_pass.list.map((feature, i) => (
                  <FeatureCard
                    key={i}
                    feature={feature}
                    index={i}
                    rotate={featureTransforms[i]?.rotate || 0}
                    translateX={featureTransforms[i]?.translateX || 0}
                    translateY={featureTransforms[i]?.translateY || 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

StepContent.displayName = "StepContent";

const GetProjectDoneClient = ({ data }: { data: GetProjectDoneData }) => {
  const { enable, title, content, project_step } = data;

  const stepTabs = useMemo(
    () => project_step.map((step) => step.step_name),
    [project_step],
  );

  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isLargeScreen: false,
    isSmallScreen: false,
  });

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isLargeScreen: window.innerWidth >= 1024,
        isSmallScreen: window.innerWidth < 640,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const activeStep = stepRefs.current[activeTab];
    if (!activeStep) return;

    const calculateHeight = () => {
      requestAnimationFrame(() => {
        const activeHeight = stepRefs.current[activeTab]?.scrollHeight || 0;
        const prevHeight = isTransitioning
          ? stepRefs.current[prevTab]?.scrollHeight || 0
          : 0;
        setContainerHeight(Math.max(activeHeight, prevHeight));
      });
    };

    const resizeObserver = new ResizeObserver(calculateHeight);
    resizeObserver.observe(activeStep);
    calculateHeight();

    return () => resizeObserver.disconnect();
  }, [activeTab, prevTab, isTransitioning, screenSize]);

  const handleTabChange = useCallback(
    (newIndex: number) => {
      if (newIndex === activeTab || isTransitioning) return;

      setDirection(newIndex > activeTab ? "up" : "down");
      setPrevTab(activeTab);
      setIsTransitioning(true);
      setActiveTab(newIndex);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    },
    [activeTab, isTransitioning],
  );

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  if (!enable) return null;

  return (
    <section className="section bg-gradient-secondary-light rounded-[60px] relative overflow-hidden">
      <div className="container">
        <ScrollAnimation>
          <h2
            className="text-center gradient-text sm:text-h1 mb-8"
            dangerouslySetInnerHTML={{ __html: markdownify(title) }}
          />
          <p className="text-center text-lg text-text-dark">{content}</p>
        </ScrollAnimation>

        <div className="mt-16">
          <ul className="grid xl:grid-cols-3 gap-4">
            {stepTabs.map((step, index) => (
              <TabButton
                key={index}
                step={step}
                index={index}
                isActive={activeTab === index}
                onClick={() => handleTabChange(index)}
              />
            ))}
          </ul>

          <div
            className="relative mt-8 overflow-hidden transition-all duration-300"
            style={{
              height: containerHeight > 0 ? `${containerHeight}px` : "auto",
            }}
          >
            {project_step.map((step, index) => {
              const isActive = activeTab === index;
              const isPrev = prevTab === index && isTransitioning;
              const isVisible = isActive || isPrev;

              let animationClass = "";
              if (isActive && isTransitioning) {
                animationClass =
                  direction === "up"
                    ? "animate-slide-in-up"
                    : "animate-slide-in-down";
              } else if (isPrev) {
                animationClass =
                  direction === "up"
                    ? "animate-slide-out-up"
                    : "animate-slide-out-down";
              }

              return (
                <StepContent
                  key={index}
                  step={step}
                  isVisible={isVisible}
                  animationClass={animationClass}
                  wrapperRef={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  screenSize={screenSize}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetProjectDoneClient;
