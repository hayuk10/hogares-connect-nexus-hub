// Theme configuration for Hogares Connect
// Corporate colors and design tokens

export const theme = {
  colors: {
    // Primary brand colors (Hogares Group inspired)
    primary: {
      blue: '#2563EB',      // Hogares trust blue
      blueLight: '#3B82F6', // Lighter blue for hover states
      blueDark: '#1D4ED8',  // Darker blue for active states
    },
    
    // Secondary brand colors
    secondary: {
      gold: '#C59D5F',      // Premium gold accent
      goldLight: '#D4AF7A', // Light gold for subtle highlights
      goldDark: '#B8924A',  // Dark gold for emphasis
    },
    
    // Neutral colors
    neutral: {
      white: '#FFFFFF',
      gray50: '#F9FAFB',
      gray100: '#F3F4F6',
      gray200: '#E5E7EB',
      gray300: '#D1D5DB',
      gray400: '#9CA3AF',
      gray500: '#6B7280',
      gray600: '#4B5563',
      gray700: '#374151',
      gray800: '#1F2937',
      gray900: '#111827',
      black: '#000000',
    },
    
    // Semantic colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    
    // Background gradients
    gradients: {
      primary: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      gold: 'linear-gradient(135deg, #C59D5F 0%, #D4AF7A 100%)',
      subtle: 'linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)',
      trust: 'linear-gradient(135deg, #2563EB 0%, #C59D5F 100%)',
    }
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(37 99 235 / 0.3)',
    goldGlow: '0 0 20px rgb(197 157 95 / 0.3)',
  },
  
  // Animation timing
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  // Breakpoints (mobile-first)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
} as const;

// Export individual color palettes for easier usage
export const colors = theme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
export const shadows = theme.shadows;

// Utility function to get theme values
export const getThemeValue = (path: string) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme);
};

// Type exports for TypeScript support
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeSpacing = typeof theme.spacing;