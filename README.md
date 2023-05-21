# webpack-template
기본 웹팩 템플릿
---

웹팩 기본 템플릿 설정 방법

1. 폴더를 만든다. 

2. 그 폴더로 들어가서 npm init -y 명령어를 통해 package.json 을 생성한다.

3. Npm i -D webpack webpack-cli webpack-dev-server@next 로 웹팩 관련 패키지들을 설치한다.
webpack: 모듈(패키지) 번들러의 핵심 패키지
webpack-cli: 터미널에서 Webpack 명령(CLI)을 사용할 수 있음
webpack-dev-server: 개발용으로 Live Server를 실행(HMR)
- Webpack-dev-server 같은 경우에는 webpack-cli와 버전을 일치시켜야 하므로, 뒤에다가 @next를 통해 최신버전으로 설치해야 한다.

4. Package.json에서 devDependencies에 설치된 내용이 잘 설치되었는지 확인

5. Package.json의 "scripts" 부분을 수정해준다.
- "test" 라고 써져있는건 지우고
"dev": "webpack-dev-server --mode development",
"build": "webpack --mode production"
를 추가한다.

6. Index.html 파일을 만들고 reset.css cdn을 첨부

7. Js 폴더를 만들고 그 안에 main.js파일을 만듦

8. Webpack.config.js 파일을 만들어서 웹팩의 기본 구성 옵션들을 기재함
- 내 깃허브의 webpack-template-basic 참조
  ○ https://github.com/Takyunho/webpack-template-basic
- 한국어로 잘 나와있다. 공식 문서도 참조!
  ○ https://webpack.kr/configuration/entry-context/


Webpack.config.js 기본 구성 👇

// 웹팩은 상세하게 설정이 가능하므로 작은 프로젝트보다 큰 프로젝트에서 유용하다.
// node js 문법으로 작성
//^ import
const path = require('path')    // node js의 path 모듈을 가져온다.
const HtmlPlugin = require('html-webpack-plugin')   // 최초 실행될 HTML 파일(템플릿)을 연결
const CopyPlugin = require('copy-webpack-plugin')   // 정적 파일을 연결

//^ export
module.exports = {
    //^ 파일을 읽어들이기 시작하는 진입점 설정(파일이 시작하는 입구라고 생각하자)
    entry: './js/main.js', 

    //^ 결과물(번들)을 반환하는 설정(파일이 나오는 출구라고 생각하자)
    output: {
        // path: path.resolve(__dirname, 'dist'),  // __dirname: 현재 파일이 있는 경로 / 'dist': dist 폴더에 결과물을 저장한다.
        // filename: 'main.js',    // 결과물 파일명
        clean: true // 기존에 만들어진 파일들을 모두 지우고 새로 만든다.

                  // - 중간정리 -
        //=> dist 폴더에 main.js 파일이 생성된다.
        //=> 그러나 웹팩에서는 결과물을 기본적으로 dist폴더에 만들어주기 때문에 path를 따로 설정하지 않아도 된다. 
        //=> filename도 entry에다가 지정한 파일명을 그대로 사용하기 때문에 filename도 따로 설정하지 않아도 된다.
    },


    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정해주는 옵션
        개발 의존성으로 설치해야 함 -> npm i -D html-webpack-plugin copy-webpack-plugin
    plugins: [
        new HtmlPlugin({
            template: './index.html'   // 최초 실행될 HTML 파일(템플릿)을 연결
        }),
        new CopyPlugin({         -- 정적파일 설정 -- 
            patterns: [
                { from: 'static' },  // static 폴더에 있는 파일들을 dist 폴더로 복사한다.
                // 형식 => { from: '경로'}
            ]
        })
    ],


-- 모듈 설정 --
    // css 파일을 읽을 수 있도록 도와주는 패키지 
    // css-loader / style-loader (개발 의존성으로 설치)
  Npm i -D css-loader style-loader
    module: {
        rules: [
            {
                test: /\.css$/,    // .css로 끝나는 파일을 찾는 정규식
                use: [
                    'style-loader', // html에 스타일을 적용할 수 있도록 해준다.
                    'css-loader'    // 자바스크립트에서 css를 읽을 수 있도록 해준다.
                    // 순서가 중요하다. 뒤에서부터 실행된다.
                ]
            }
        ]
    }

    // devServer: {
    //     host: "localhost"
    // }
}

</br>
</br>
-- scss 설정하기 --
1. Npm i -D sass-loader sass
2. Module의 use에 설정하기


3. Main.scss 작성하기
$color--black : #000;
$color--white : #fff;
body {
    background-color: $color--black;
    h1 {
        color: $color--white;
        font-size: 40px;
        display: flex;;
    }
}

4. Main.js의 import 부분 작성하기

import "../scss/main.scss";

</br>
</br>
-- autoprefixer 설치하기 --
1. npm i -D postcss autoprefixer postcss-loader
// autoprefixer란
// 브라우저 호환성을 위해 css에 접두사를 붙여주는 플러그인
// postcss
// 스타일의 후처리를 도와주는 패키지
// postcss-loader
// postcss를 웹팩에서 사용할 수 있게 해주는 로더

2. Module 의 use 설정 ('postcss-loader' 부분)


3. Package.json에 browserslist 설정


 "browserslist": [
    "> 1%",
    "last 2 versions"
  ]

4. Root경로에 .postcss.rc.js 파일 추가 후 아래 내용 설정하기


</br>
</br>
-- babel 설정하기 --
1. npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
2. Npm i -D babel-loader
3. Root 경로에 .babelrc.js 파일 만들고 설정하기
module.exports = {
    presets: ['@babel/preset-env'], // babel이 동작할 수 있도록 설정해준다.
    plugins: [
        ['@babel/plugin-transform-runtime'] // async, await를 사용할 수 있도록 해준다.
    ]
}


4. webpack.config.json의 module에 babel-loader 설정
	
	
	
		 {
                test: /\.js$/,  // .js로 끝나는 파일을 찾는 정규식
                use: [
                    'babel-loader'  // babel이 동작할 수 있도록 해준다.
                ]
            }
![image](https://github.com/Takyunho/webpack-template/assets/88031846/10aacaaa-6f5f-4cf6-a0e5-8a1ad7994276)
