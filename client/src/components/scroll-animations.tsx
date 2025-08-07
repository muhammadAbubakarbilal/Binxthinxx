import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'textReveal';
  delay?: number;
  duration?: number;
}

const animationVariants = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  slideLeft: {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  },
  textReveal: {
    hidden: {
      opacity: 0,
      y: 20,
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  },
};

export function ScrollAnimation({ 
  children, 
  className = '', 
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8 
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={`will-change-transform gpu-accelerated ${className}`}
      variants={animationVariants[variant]}
      initial="hidden"
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // --transition-slow
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // --transition-medium
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`will-change-transform ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

// Hook for character-by-character text animation
export function useTextReveal(text: string, delay: number = 0.05) {
  const characters = text.split('');
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0], // --transition-fast
      },
    },
  };

  return {
    characters,
    containerVariants,
    characterVariants,
  };
}