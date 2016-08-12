/*
 * WebPack is used to compile the "frontend" code that will run in the Electron
 * browser. This configuration is used for a lot of the logic, but some of it
 * is also in gulp/frontend.js
 */
var path = require("path");

module.exports = {
    entry: ["./src/index.tsx"],

    output: {
        // Why this has to be an absolute path is beyond me .. fucking NodeJS
        // developers...
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "dist/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};