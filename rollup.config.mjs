import scss from 'rollup-plugin-scss';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        scss({
            output: './dist/main.css',
            include: ['src/**/*.scss']
        })
    ]
}
