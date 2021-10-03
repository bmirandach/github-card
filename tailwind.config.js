module.exports = {
  purge: [
    './public/**/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'stats': 'rgb(243, 213, 192)',
        'btn': 'rgb(80, 109, 132)',
        'btn-hover': 'rgb(112, 113, 152)',
        'card': '#fafafa',
        'brown': 'rgb(74, 64, 58)',
        'light-brown': 'rgb(92, 61, 46)',
      },
      boxShadow: {
        card: '10px 10px 15px 0 rgba(0,0,0,0.3)',
      },
      fontFamily: {
        'roboto': ['Roboto']
      }
    },
    backgroundImage: theme => ({
      'search': "url('../images/icon-search.svg')",
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
