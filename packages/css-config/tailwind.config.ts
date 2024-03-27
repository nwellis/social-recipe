import type { Config } from 'tailwindcss';

const fileExtensions = 'astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue' as const

const config: Config = {
  darkMode: 'class',
  content: [
    `../../packages/ui/**/*.{${fileExtensions}}`,
    `./**/*.{${fileExtensions}}`,
    `./pages/**/*.{${fileExtensions}}`,
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        'title': 'var(--title-font)',
        'body': 'var(--body-font)',
      },
      zIndex: {
        'detail-1': '31',
        'detail-2': '32',

        'modal-backdrop': '50',
        'modal-1': '51',
        'modal-2': '52',
        'modal-3': '53',

        'tooltip-1': '71',
        'tooltip-2': '72',
      },
      screens: {
        'tablet': '680px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      gridTemplateRows: {
        'header-footer': 'auto 1fr auto',
      },
      gridTemplateColumns: {
        'sidebars': 'auto 1fr auto',
        'gutters': '1fr auto 1fr',
      },
      borderRadius: {
        btn: '0.75rem',
      },
      gap: {
        '18': '72px'
      },
      colors: {
        white: {
          DEFAULT: '#FCFCFC',
          actual: '#FFFFFF',
        },
        black: {
          DEFAULT: '#13151A',
          actual: '#000000',
        },
        divider: {
          DEFAULT: '#CBD5E1',
        },
        card: {
          bg: '#FFFFFF',
          border: '#CBD5E1',
        },
        muted: {
          DEFAULT: '#4B5563',
          more: '#6B7280',
        },
        accent: {
          light: '#E0CCFA',
          DEFAULT: '#883AEA',
          dark: '#310A65',
        },
        status: {
          info: '#0E4876',
          infolight: '#96C5EE',
          error: '#B91C1C',
          errorlight: '#F7A1AB',
          warning: '#D97706',
          warninglight: '#FBB360',
          success: '#16A34A',
          successlight: '#4BE784',
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentShowBelow: {
          from: { opacity: '0', transform: 'translate(0, 100%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(0, 0%) scale(1)' },
        },
        linearProgress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
        buttonPop: {
          '0%': { transform: 'scale(.90)' },
          '40%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.0)' }
        },

        // Radix specific
        radixSlideDown: {
          from: { opacity: '0', height: '0' },
          to: { opacity: '1', height: 'var(--radix-collapsible-content-height)' },
        },
        radixSlideUp: {
          from: { opacity: '1', height: 'var(--radix-collapsible-content-height)' },
          to: { opacity: '0', height: '0' },
        },
      },
      animation: {
        linearProgress: 'linearProgress 1s infinite linear',
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        overlayShow: 'overlayShow 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShowBelow: 'contentShowBelow 750ms cubic-bezier(0.16, 1, 0.3, 1)',
        pop: 'buttonPop 0.25s ease-out',

        // Radix specific
        collapsibleShow: 'radixSlideDown 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        collapsibleHide: 'radixSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    function plugin({ addUtilities }) {
      addUtilities({
        '.scroll-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Webkit-based browsers (Chrome, Safari and Opera) */
          '&::-webkit-scrollbar': {
            'display': 'none',
          }
        },

        '.p-button-comfy': {
          '@apply py-2 px-4': {}
        },
        '.p-button-compact': {
          '@apply py-1 px-3': {}
        },
        'accent-gradient': {

        },

        /**
         * Poor experience using these environment variables. They weren't catching the space the
         * address bar took up on bottom b/c that just shifts the viewport, doesn't overlay it. Two 
         * different concepts. However in landscape mode its not uncommon to see some padding for
         * black navigation bar on the bottom.
         * @see https://webkit.org/blog/7929/designing-websites-for-iphone-x/
         */
        '.pb-safe': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.pt-safe': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.pl-safe': {
          'padding-left': 'env(safe-area-inset-left)',
        },
        '.pr-safe': {
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.mb-safe': {
          'margin-bottom': 'env(safe-area-inset-bottom)',
        },
        '.mt-safe': {
          'margin-top': 'env(safe-area-inset-top)',
        },
        '.ml-safe': {
          'margin-left': 'env(safe-area-inset-left)',
        },
        '.mr-safe': {
          'margin-right': 'env(safe-area-inset-right)',
        },
      })
    },
  ],
}

export default config;