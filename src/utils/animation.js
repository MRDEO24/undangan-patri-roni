export const animateTopRight = {
  initial: {
    transformOrigin: 'right top', // Set the transform origin to the top-right corner
  },
  animate: {
    rotate: [0, 5, 0, -5, 0, 5, 0, -5, 0], // Mirror the rotation pattern
    x: [0, 5, 0, -5, 0, 5, 0, -5, 0], // Move back and forth along the x-axis
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Keep the y-axis position constant
    // scale: [1, 1.05, 1, 0.97, 1],
  },
  transition: {
    duration: 20, // Animation duration in seconds
    repeat: Infinity, // Repeat the animation indefinitely
    ease: 'linear', // Linear easing for a wiper-like movement
  },
};

export const animateTopLeft = {
  initial: {
    transformOrigin: 'left top', // Set the transform origin to the top-right corner
  },
  animate: {
    rotate: [0, 15, 0, -15, 0, 15, 0, -15, 0], // Mirror the rotation pattern
    x: [0, 5, 0, -5, 0, 5, 0, -5, 0], // Move back and forth along the x-axis
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Keep the y-axis position constant
    scale: [1, 1.2, 1, 0.97, 1],
  },
  transition: {
    duration: 50, // Animation duration in seconds
    repeat: Infinity, // Repeat the animation indefinitely
    ease: 'linear', // Linear easing for a wiper-like movement
  },
};

export const animateRightToLeft = {
  initial: {
    x: '100vw',
    y: '-50vh',
  },
  animate: {
    x: '0vw',
    y: '0vh',
  },
  transition: {
    duration: 2,
  },
};

export const animateLeftToRight = {
  initial: {
    x: '-120vw',
    y: '-50vh',
  },
  animate: {
    x: '0vw',
    y: '0vh',
  },
  transition: {
    duration: 2,
  },
};

export const fadeInTopToBottom = {
  initial: {
    y: '-30px',
    opacity: 0,
  },

  animate: {
    y: '0px',
    opacity: 1,
  },

  transition: {
    duration: 1.5,
    delay: 1,
  },
};
export const fadeInTopToBottomFast = {
  initial: {
    y: '-60px',
    opacity: 0,
  },

  animate: {
    y: '0px',
    opacity: 1,
  },

  transition: {
    duration: 1,
    delay: 0.5,
  },
};

export const fadeInTop = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 1,
    },
  },
};

export const fadeInRight = {
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const fade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const scaleUp = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
  },
  transition: {
    duration: 1,
    delay: 2,
  },
};

export const shakeButton = {
  rest: { scale: 1 },
  tap: {
    scale: [1, 1.1, 1, 1.1, 1],
    rotate: [0, 10, -10, 10, -10, 0],
  },
};

export const mainBox = {
  initial: { opacity: 0, y: '-60px' },
  animate: {
    opacity: 1,
    y: '0px',
    transition: {
      duration: 2,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};
