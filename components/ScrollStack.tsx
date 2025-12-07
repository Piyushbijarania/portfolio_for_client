'use client';

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(
    new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>()
  );
  const stackCompletedRef = useRef(false);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((value: number, start: number, end: number) => {
    if (value <= start) return 0;
    if (value >= end) return 1;
    return (value - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : 0
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }

      let offset = element.offsetTop;
      let current: HTMLElement | null = element.offsetParent as HTMLElement;

      while (current) {
        offset += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      return offset;
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (isUpdatingRef.current) return;
    if (!cardsRef.current.length) return;

    isUpdatingRef.current = true;

    try {
      const { scrollTop, containerHeight } = getScrollData();
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      const endElement = endRef.current;
      const endElementTop = endElement ? getElementOffset(endElement) : 0;

      cardsRef.current.forEach((card, index) => {
        const cardTop = getElementOffset(card);
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = triggerStart;
        const pinEnd = endElementTop - containerHeight / 2;

        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = baseScale + index * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let i = 0; i < cardsRef.current.length; i += 1) {
            const currentCardTop = getElementOffset(cardsRef.current[i]);
            const currentTriggerStart = currentCardTop - stackPositionPx - itemStackDistance * i;
            if (scrollTop >= currentTriggerStart) {
              topCardIndex = i;
            }
          }

          if (index < topCardIndex) {
            const depthInStack = topCardIndex - index;
            blur = Math.max(0, depthInStack * blurAmount);
          }
        }

        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isPinned) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
        }

        const newTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100
        };

        const lastTransform = lastTransformsRef.current.get(index);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

        if (hasChanged) {
          const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
          const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

          card.style.transform = transform;
          card.style.filter = filter;

          lastTransformsRef.current.set(index, newTransform);
        }

        const isLastCard = index === cardsRef.current.length - 1;
        if (isLastCard) {
          const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (inView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!inView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    } finally {
      isUpdatingRef.current = false;
    }
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    lastTransformsRef.current.clear();
    stackCompletedRef.current = false;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      } else {
        card.style.marginBottom = '0px';
      }

      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.transition = `transform ${scaleDuration}s ease, filter ${scaleDuration}s ease`;
      card.style.backfaceVisibility = 'hidden';
    });

    let rafId: number | null = null;

    const requestUpdate = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        updateCardTransforms();
        rafId = null;
      });
    };

    const scrollContainer: Window | HTMLElement | null = useWindowScroll ? window : scroller;

    requestUpdate();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', requestUpdate, { passive: true });
    }
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', requestUpdate as EventListener);
      }
      window.removeEventListener('resize', requestUpdate);
    };
  }, [
    children,
    itemDistance,
    scaleDuration,
    updateCardTransforms,
    useWindowScroll
  ]);

  const wrapperClass = `scroll-stack-wrapper relative w-full overflow-x-visible ${
    useWindowScroll ? '' : 'h-full'
  } ${className}`.trim();

  const wrapperStyle: CSSProperties = useWindowScroll
    ? {
        position: 'relative',
        overflow: 'visible',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
        overflowY: 'auto'
      };

  return (
    <div className={wrapperClass} ref={scrollerRef} style={wrapperStyle}>
      <div className="scroll-stack-inner relative">
        {children}
        <div ref={endRef} className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
};

export default ScrollStack;
