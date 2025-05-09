import path from 'path';

export default {
    mode: 'development',
    entry: {
        map: './src/map.js',
        addImage: './src/addImage.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./build')
    },
    module: { rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }] },
}