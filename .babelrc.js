module.exports = {
    presets: ['@babel/preset-env'], // babel이 동작할 수 있도록 설정해준다.
    plugins: [
        ['@babel/plugin-transform-runtime'] // async, await를 사용할 수 있도록 해준다.
    ]
}