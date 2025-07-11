/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // << ISSO É OBRIGATÓRIO
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'meu-azul': '#1da1f2',       // cor do Twitter
        'meu-verde': '#2ecc71',      // cor de sucesso
        'meu-cinza': '#bdc3c7',      // cinza claro
        'meu-azul-escuro':'#136185',
        'roxorocket': {
          50: '#6b21a8',
          100: '#4338ca'
        },
        'primary': '#18205e',
        'secondary': '#2ecc71',
        'tertiary': '#f1c40f',
        'error': '#e74c3c'           // corrigido (era #e74c3**t**)
      }
    },
  },
  plugins: [],
}
