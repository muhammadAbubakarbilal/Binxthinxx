import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursor || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate cursor dot movement
      cursor.style.left = `${mouseX - 4}px`;
      cursor.style.top = `${mouseY - 4}px`;

      // Check for interactive elements proximity
      const elements = document.querySelectorAll('.interactive, button, a, [role="button"]');
      let nearElement = false;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY - (rect.top + rect.height / 2), 2)
        );

        if (distance < 80) {
          nearElement = true;
          const intensity = Math.max(0, 1 - distance / 80);
          (el as HTMLElement).style.boxShadow = `0 0 ${20 * intensity}px rgba(216, 111, 56, ${0.3 * intensity})`;
        } else {
          (el as HTMLElement).style.boxShadow = '';
        }
      });

      // Scale cursor based on proximity to interactive elements
      const scale = nearElement ? 1.5 : 1;
      cursor.style.transform = `scale(${scale})`;
      cursorOutline.style.transform = `scale(${scale})`;
    };

    const animateCursor = () => {
      // Smooth trailing effect for outline
      const dx = mouseX - outlineX;
      const dy = mouseY - outlineY;
      
      outlineX += dx * 0.1;
      outlineY += dy * 0.1;

      cursorOutline.style.left = `${outlineX - 20}px`;
      cursorOutline.style.top = `${outlineY - 20}px`;

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      
      // Clean up any remaining glow effects
      const elements = document.querySelectorAll('.interactive, button, a, [role="button"]');
      elements.forEach((el) => {
        (el as HTMLElement).style.boxShadow = '';
      });
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-burnt-orange rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ mixBlendMode: 'difference' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Cursor Outline */}
      <motion.div
        ref={cursorOutlineRef}
        className="fixed w-10 h-10 border border-burnt-orange rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{ mixBlendMode: 'difference' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
}