# Next.jsことはじめ

## Next作成

```bash
npx create-next-app sample-app --use-npm
```
* 動作確認

```bash
cd sample-app/
npm run dev
```
## 必要なpackageを追加
```bash
 npm i -D typescript @types/react @types/node

```

## tsconfig.jsonを追加
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## .jsの拡張子を変更し型定義を追加

```bash
mv ./pages/api/hello.js  ./pages/api/hello.ts
mv ./pages/_app.js ./pages/_app.tsx
mv ./pages/index.js ./pages/index.tsx
```

```typescript
// Before: hello.js
export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}

// After: hello.ts
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}
```


```typescript
// Before: _app.js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// After: _app.tsx
import '../styles/globals.css'
import {AppProps} from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
}
```

## ESLint導入

```bash
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
touch .eslintrc.js
```

```javascript
module.exports = {
    "plugins": ["prettier"],
    "extends": ["plugin:react/recommended"],
    "rules": {
        "prettier/prettier": "error"
    }
};
```

## Prettier導入

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
touch .prettierrc
```

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "arrowParens": "always"
}
```


## Reactコンポーネント追加

https://github.com/murasuke/hand-writing-react-component
からコンポーネントを組み込んでみる

* componetsフォルダには、コンポーネント自身を追加
* pagesには、コンポーネントを利用するPageを追加
  * localhost:3000/handWriting で開くことができる(Routing組み込み済み)

```bash
mkdir components
touch ./components/HandWrinting.tsx
touch ./pages/handWrinting.tsx
```

