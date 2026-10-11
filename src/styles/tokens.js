/**
 * Command Center Design Tokens & Color Palettes
 * Dark glassmorphism command center styling inspired by Linear, Vercel, Palantir Gotham & Apple Maps dark mode.
 */

export const TOKENS = {
  colors: {
    bg: '#070B14',
    bgLayered: 'radial-gradient(1000px circle at 0% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 60%), radial-gradient(1000px circle at 100% 0%, rgba(244, 63, 94, 0.08) 0%, transparent 60%), #070B14',
    
    // Glass Surface Tokens
    surface: 'rgba(255, 255, 255, 0.04)',
    surfaceHover: 'rgba(255, 255, 255, 0.07)',
    surfaceActive: 'rgba(255, 255, 255, 0.09)',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    surfaceBorderHighlight: 'rgba(255, 255, 255, 0.16)',

    // Accents
    cyan: '#22D3EE',      // Primary
    red: '#F43F5E',       // Critical
    amber: '#F59E0B',     // High
    green: '#10B981',     // Safe / Verified
    violet: '#8B5CF6',    // AI Agent
    blue: '#38BDF8',

    // Text
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
  },
  glows: {
    critical: '0 0 24px rgba(244, 63, 94, 0.25)',
    cyan: '0 0 20px rgba(34, 211, 238, 0.2)',
    amber: '0 0 20px rgba(245, 158, 11, 0.2)',
    green: '0 0 20px rgba(16, 185, 129, 0.2)',
    violet: '0 0 20px rgba(139, 92, 246, 0.25)',
  },
  radius: {
    card: '16px',
    button: '12px',
    pill: '9999px',
  }
};
