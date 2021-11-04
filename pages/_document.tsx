import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from 'src/styles/createEmotionCache'
import { AppType } from 'next/dist/shared/lib/utils'
import { EmotionCache } from '@emotion/utils'

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Like Tinder, but for business" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Google+Sans:400,500,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

AppDocument.getInitialProps = async (ctx) => {
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp:
        (App: AppType | React.FC<{ emotionCache: EmotionCache }>) => (props) =>
          <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  // Prevents emotion to render invalid HTML
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}
