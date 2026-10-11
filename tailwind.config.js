/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core command center palette
        void: '#0B0F14',
        surface: {
          100: '#111820',
          200: '#151E28',
          300: '#1A2535',
          400: '#1E2D40',
        },
        // Semantic severity colors
        critical: '#EF4444',
        danger:   '#F43F5E',
        high:     '#F97316',
        moderate: '#EAB308',
        safe:     '#10B981',
        info:     '#22D3EE',
        violet:   '#8B5CF6',
        // Border tones
        border: {
          subtle:  'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.10)',
          strong:  'rgba(255,255,255,0.16)',
        },
        // Text hierarchy
        text: {
          primary:   '#F8FAFC',
          secondary: '#94A3B8',
          muted:     '#64748B',
          dim:       '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
      boxShadow: {
        // Glows
        'glow-cyan':   '0 0 20px -4px rgba(34, 211, 238, 0.5)',
        'glow-red':    '0 0 20px -4px rgba(239, 68, 68, 0.5)',
        'glow-orange': '0 0 20px -4px rgba(249, 115, 22, 0.4)',
        'glow-green':  '0 0 20px -4px rgba(16, 185, 129, 0.4)',
        'glow-violet': '0 0 20px -4px rgba(139, 92, 246, 0.4)',
        // Panels
        'panel': '0 4px 24px -2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'panel-hover': '0 8px 32px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      animation: {
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'ping-slow':   'ping 2.5s ease-out infinite',
        'shimmer':     'shimmer 2s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite alternate',
        'slide-up':    'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fadeIn 0.3s ease-out forwards',
        'scan-line':   'scanLine 4s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%':   { opacity: '0.6', transform: 'scale(1)' },
          '100%': { opacity: '1',   transform: 'scale(1.02)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        xs: '4px',
      }
    },
  },
  plugins: [],
}
