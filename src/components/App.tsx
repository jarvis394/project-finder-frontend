import { DocumentAppProps } from 'pages/_app'
import React from 'react'

const App: React.FC<DocumentAppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default React.memo(App)
