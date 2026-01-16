"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue, useMotionValue, useSpring } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
  scrollContainer,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  scrollContainer?: React.RefObject<HTMLElement | null>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Custom scroll progress for container-based scrolling
  const scrollProgress = useMotionValue(0);

  // Smooth the progress for nicer animation
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Direct scroll tracking - simpler and more reliable
  useEffect(() => {
    if (!scrollContainer) return;

    const handleScroll = () => {
      const container = scrollContainer.current;
      const target = containerRef.current;

      if (!container || !target) return;

      const scrollTop = container.scrollTop;

      // Find target's offset from scroll content start
      // This accounts for any wrapper divs between container and target
      let targetOffset = 0;
      let el: HTMLElement | null = target;
      while (el && el !== container) {
        targetOffset += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
        if (el === document.body) break;
      }

      // Animation range: from scroll 0 to when card top reaches viewport top
      // Progress 0: scrollTop = 0 (modal just opened)
      // Progress 1: scrollTop = targetOffset (card at top of viewport)
      const animationEndScroll = Math.max(targetOffset, 100); // At least 100px of scroll

      const progress = Math.max(0, Math.min(1, scrollTop / animationEndScroll));

      scrollProgress.set(progress);
    };

    // Use MutationObserver to detect when container is ready
    const observer = new MutationObserver(() => {
      const container = scrollContainer.current;
      if (container) {
        handleScroll(); // Initial calculation
        container.addEventListener("scroll", handleScroll, { passive: true });
        observer.disconnect();
      }
    });

    // Capture ref value for cleanup
    const container = scrollContainer.current;

    // Check if already available
    if (container) {
      handleScroll();
      container.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      // Watch for DOM changes
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer, scrollProgress]);

  // Fallback to window scroll if no container provided
  const { scrollYProgress: windowScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Use custom progress when scrollContainer prop is provided, window progress otherwise
  const activeProgress = scrollContainer ? smoothProgress : windowScrollProgress;

  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate = useTransform(activeProgress, [0, 1], [20, 0]);
  const scale = useTransform(activeProgress, [0, 1], scaleDimensions);
  const translate = useTransform(activeProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[40rem] md:h-[60rem] lg:h-[80rem] flex items-center justify-center relative px-4 py-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-20 lg:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        borderColor: 'var(--color-device-border)',
        backgroundColor: 'var(--color-device-frame)',
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-8 md:-mt-12 mx-auto h-[20rem] md:h-[30rem] lg:h-[40rem] w-full border-2 md:border-4 p-1.5 md:p-4 lg:p-6 rounded-[20px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-nextpixel-cream p-1 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
