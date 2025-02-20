/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                merriweather: ['Merriweather', 'sans-serif'],
                alegreya: ['Alegreya', 'sans-serif']
            },
            backgroundColor: {
                "green-light": '#E6F6F4',
                "green-normal": '#00A991',
                "green-dark": '#007F6D',
                "green-darker": '#003B33',
                "white-active": '#F5F7F9',
                "grey": "#EBEEF2"
            },
            screens: {
                'medium-screen': {
                    max: '850px'
                },
                'small-screen' : {
                    max: '600px'
                }
            }
        },
    },
    plugins: [],
}

