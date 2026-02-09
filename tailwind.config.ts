import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Void Protocol palette
        'void-black': '#0a0a0a',
        'blood-red': '#ff0040',
        'bone-white': '#e8e8e8',
        'terminal-green': '#00ff41',
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'space-mono': ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'massive': ['150px', { lineHeight: '0.9', letterSpacing: '0.05em' }],
        'huge': ['120px', { lineHeight: '0.95', letterSpacing: '0.05em' }],
        'epic': ['80px', { lineHeight: '1', letterSpacing: '0.05em' }],
        'big': ['60px', { lineHeight: '1', letterSpacing: '0.03em' }],
        'body-lg': ['24px', { lineHeight: '1.5' }],
        'body': ['18px', { lineHeight: '1.5' }],
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'clip-glitch': 'clip-glitch 2s infinite',
        'border-crack': 'border-crack 0.5s infinite',
        'scramble': 'scramble 0.1s infinite',
        'progress-glitch': 'progress-glitch 1s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'clip-glitch': {
          '0%': { clipPath: 'inset(40% 0 61% 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)' },
        },
        'border-crack': {
          '0%, 100%': { borderColor: '#ff0040' },
          '25%': { borderColor: '#0a0a0a' },
          '50%': { borderColor: '#ff0040' },
          '75%': { borderColor: '#e8e8e8' },
        },
        scramble: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'progress-glitch': {
          '0%, 100%': { width: 'var(--progress, 0%)' },
          '50%': { width: 'calc(var(--progress, 0%) + 5%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
