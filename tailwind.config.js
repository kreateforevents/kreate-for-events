/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#84ACFF',
          400: '#5B91FF',
          500: '#3B82F6',
          600: '#1E40AF',
          700: '#0F2A5C',
          800: '#0C1E47',
          900: '#061230',
        },
        // Secondary Colors (Accent Orange)
        secondary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A360E',
          900: '#7C2D12',
        },
        // Status Colors
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        info: {
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#84ACFF',
          400: '#5B91FF',
          500: '#3B82F6',
          600: '#1E40AF',
          700: '#0F2A5C',
          800: '#0C1E47',
          900: '#061230',
        },
        // Neutral Colors
        neutral: {
          0: '#FFFFFF',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        secondary: ['"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        // Headings
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],      // 32px
        'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '700' }],   // 28px
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],    // 24px
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],   // 20px
        'h5': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],      // 16px
        'h6': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],  // 14px
        
        // Body
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],           // 16px
        'body-md': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],       // 14px
        'body-sm': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],        // 12px
        
        // Special
        'button': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],        // 14px
        'label': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],         // 14px
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],        // 12px
        'code': ['0.8125rem', { lineHeight: '1.6', fontWeight: '400' }],         // 13px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        // Custom spacing based on 8px scale
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '64px',
      },
      borderRadius: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
        'lg': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'xl': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '2xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'focus': '0 0 0 3px rgba(30, 64, 175, 0.1)',
        'focus-error': '0 0 0 3px rgba(239, 68, 68, 0.1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
      zIndex: {
        'auto': 'auto',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'tooltip': '1070',
      },
      minHeight: {
        'button': '40px',
        'input': '40px',
        'card': '100px',
      },
      minWidth: {
        'button': '100px',
        'input': '100px',
        'dropdown': '200px',
      },
      maxWidth: {
        'modal': '600px',
        'modal-sm': '400px',
        'modal-lg': '900px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'fade-out': 'fadeOut 200ms ease-in-out',
        'slide-in': 'slideIn 300ms ease-out',
        'bounce-subtle': 'bounceSubtle 200ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [
    // Custom form plugin for consistent input styling
    function({ addComponents, theme }) {
      addComponents({
        // Base button styles
        '.btn': {
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'border': 'none',
          'border-radius': theme('borderRadius.md'),
          'font-weight': theme('fontWeight.semibold'),
          'font-size': theme('fontSize.body-md')[0],
          'padding': `${theme('spacing.md')} ${theme('spacing.lg')}`,
          'height': '40px',
          'cursor': 'pointer',
          'transition': `all ${theme('transitionDuration.base')} ease`,
          'outline': 'none',
          '&:focus-visible': {
            'outline': `2px solid ${theme('colors.primary.600')}`,
            'outline-offset': '2px',
          },
          '&:disabled': {
            'opacity': '0.5',
            'cursor': 'not-allowed',
          },
        },
        // Button variants
        '.btn-primary': {
          'background-color': theme('colors.primary.600'),
          'color': theme('colors.neutral.0'),
          'box-shadow': 'none',
          '&:hover:not(:disabled)': {
            'background-color': theme('colors.primary.700'),
            'box-shadow': `0 4px 12px rgba(30, 64, 175, 0.3)`,
          },
          '&:active:not(:disabled)': {
            'background-color': theme('colors.primary.800'),
          },
        },
        '.btn-secondary': {
          'background-color': theme('colors.neutral.50'),
          'color': theme('colors.primary.600'),
          'border': `1px solid ${theme('colors.neutral.200')}`,
          '&:hover:not(:disabled)': {
            'background-color': theme('colors.neutral.100'),
            'border-color': theme('colors.neutral.400'),
          },
        },
        '.btn-danger': {
          'background-color': theme('colors.error.500'),
          'color': theme('colors.neutral.0'),
          '&:hover:not(:disabled)': {
            'background-color': theme('colors.error.600'),
          },
          '&:active:not(:disabled)': {
            'background-color': theme('colors.error.700'),
          },
        },
        '.btn-ghost': {
          'background-color': 'transparent',
          'color': theme('colors.neutral.500'),
          'border': 'none',
          'padding': `${theme('spacing.sm')} ${theme('spacing.md')}`,
          '&:hover:not(:disabled)': {
            'background-color': theme('colors.neutral.50'),
            'color': theme('colors.neutral.900'),
          },
        },
        '.btn-sm': {
          'padding': `${theme('spacing.sm')} ${theme('spacing.md')}`,
          'height': '36px',
          'font-size': theme('fontSize.body-sm')[0],
        },
        '.btn-lg': {
          'padding': `${theme('spacing.lg')} ${theme('spacing.xl')}`,
          'height': '48px',
          'font-size': theme('fontSize.body-lg')[0],
        },
        
        // Form inputs
        '.input': {
          'display': 'block',
          'width': '100%',
          'height': '40px',
          'padding': `${theme('spacing.md')} ${theme('spacing.md')}`,
          'font-size': theme('fontSize.body-md')[0],
          'border': `1px solid ${theme('colors.neutral.200')}`,
          'border-radius': theme('borderRadius.md'),
          'background-color': theme('colors.neutral.0'),
          'color': theme('colors.neutral.900'),
          'transition': `border-color ${theme('transitionDuration.base')} ease, box-shadow ${theme('transitionDuration.base')} ease`,
          '&::placeholder': {
            'color': theme('colors.neutral.400'),
          },
          '&:focus': {
            'border-color': theme('colors.primary.600'),
            'box-shadow': `0 0 0 3px ${theme('colors.primary.500')}20`,
            'outline': 'none',
          },
          '&:disabled': {
            'background-color': theme('colors.neutral.50'),
            'color': theme('colors.neutral.400'),
            'cursor': 'not-allowed',
          },
        },
        '.input-error': {
          'border-color': theme('colors.error.500'),
          '&:focus': {
            'border-color': theme('colors.error.600'),
            'box-shadow': `0 0 0 3px ${theme('colors.error.500')}20`,
          },
        },
        '.input-success': {
          'border-color': theme('colors.success.500'),
          '&:focus': {
            'border-color': theme('colors.success.600'),
            'box-shadow': `0 0 0 3px ${theme('colors.success.500')}20`,
          },
        },
        
        // Form groups and labels
        '.form-group': {
          'display': 'flex',
          'flex-direction': 'column',
          'gap': theme('spacing.sm'),
        },
        '.form-label': {
          'font-size': theme('fontSize.body-md')[0],
          'font-weight': theme('fontWeight.semibold'),
          'color': theme('colors.neutral.900'),
        },
        '.form-label-required::after': {
          'content': '"*"',
          'color': theme('colors.error.500'),
          'margin-left': theme('spacing.xs'),
        },
        '.form-helper': {
          'font-size': theme('fontSize.caption')[0],
          'color': theme('colors.neutral.500'),
          'margin-top': theme('spacing.xs'),
        },
        '.form-error': {
          'font-size': theme('fontSize.caption')[0],
          'color': theme('colors.error.600'),
          'margin-top': theme('spacing.xs'),
        },
        '.form-success': {
          'font-size': theme('fontSize.caption')[0],
          'color': theme('colors.success.600'),
          'margin-top': theme('spacing.xs'),
        },
        
        // Cards
        '.card': {
          'background-color': theme('colors.neutral.0'),
          'border': `1px solid ${theme('colors.neutral.200')}`,
          'border-radius': theme('borderRadius.lg'),
          'padding': theme('spacing.2xl'),
          'box-shadow': theme('boxShadow.md'),
          'transition': `box-shadow ${theme('transitionDuration.base')} ease`,
        },
        '.card:hover': {
          'box-shadow': theme('boxShadow.lg'),
        },
        '.card-header': {
          'padding-bottom': theme('spacing.lg'),
          'border-bottom': `1px solid ${theme('colors.neutral.200')}`,
        },
        '.card-body': {
          'padding': `${theme('spacing.lg')} 0`,
        },
        '.card-footer': {
          'padding-top': theme('spacing.lg'),
          'border-top': `1px solid ${theme('colors.neutral.200')}`,
          'display': 'flex',
          'justify-content': 'flex-end',
          'gap': theme('spacing.md'),
        },
        
        // Modals
        '.modal-overlay': {
          'position': 'fixed',
          'inset': '0',
          'background-color': 'rgba(17, 24, 39, 0.5)',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'z-index': theme('zIndex.modal-backdrop'),
          'backdrop-filter': 'blur(4px)',
        },
        '.modal': {
          'background-color': theme('colors.neutral.0'),
          'border-radius': theme('borderRadius.xl'),
          'padding': theme('spacing.2xl'),
          'box-shadow': theme('boxShadow.2xl'),
          'max-width': theme('maxWidth.modal'),
          'width': '90vw',
          'max-height': '90vh',
          'overflow-y': 'auto',
          'z-index': theme('zIndex.modal'),
        },
        
        // Badges
        '.badge': {
          'display': 'inline-flex',
          'align-items': 'center',
          'padding': `${theme('spacing.xs')} ${theme('spacing.md')}`,
          'border-radius': theme('borderRadius.full'),
          'font-size': theme('fontSize.caption')[0],
          'font-weight': theme('fontWeight.semibold'),
        },
        '.badge-primary': {
          'background-color': theme('colors.primary.100'),
          'color': theme('colors.primary.700'),
        },
        '.badge-success': {
          'background-color': theme('colors.success.100'),
          'color': theme('colors.success.700'),
        },
        '.badge-error': {
          'background-color': theme('colors.error.100'),
          'color': theme('colors.error.700'),
        },
        '.badge-warning': {
          'background-color': theme('colors.warning.100'),
          'color': theme('colors.warning.700'),
        },
      });
    },
  ],
};
