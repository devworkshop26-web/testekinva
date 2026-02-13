/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    900: '#0c4a6e',
                },
                slate: {
                    800: '#1e293b',
                    900: '#0f172a',
                },
                // Brand colors from Logo
                brand: {
                    coral: '#FF6B6B', // The 'S' or dots
                    purple: '#8B5CF6', // The 'y'
                    teal: '#14B8A6',   // The 'n'
                },
                accent: {
                    light: '#5eead4',
                    DEFAULT: '#14B8A6', // Using the Teal from the logo as the main action color
                    dark: '#0f766e',
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
