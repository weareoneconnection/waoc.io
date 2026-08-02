"use client";

import {
  CSSProperties,
  ElementType,
  ReactNode,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  threshold?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  threshold = 0.12,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      className: `reveal ${visible ? "isVisible" : ""} ${className}`.trim(),
      style,
    },
    children,
  );
}
