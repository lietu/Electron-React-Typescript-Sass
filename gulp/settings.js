// When there are errors in Gulp this makes it show the full backtrace.
Error.stackTraceLimit = Infinity;

module.exports = {
    paths: {
        launcher: ["src/launcher.ts", "src/backend/**/*.ts"],
        client: ["src/index.ts", "src/components/**/*.ts"],
        typings: ["typings/**/*.d.ts"]
    }
};
