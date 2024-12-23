import Document, { Html, Head, Main, NextScript } from 'next/document';
// There are commented code below that are not included in the files therefore to make sure that it works properly, you can uncomment the code below. 
// be sure to create and add files in the public folder to make sure that the code below works properly.

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="Puto Order" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Puto Order" />
          <meta name="description" content="Order delicious Puto online with ease" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#FCE18E" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#53B7D2" />

          <link rel="apple-touch-icon" href="/icons/icon512_maskable.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon512_maskable.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon512_maskable.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon512_maskable.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon512_rounded.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon512_rounded.png" />
          
          {/* <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#53B7D2" /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />


          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://puto-order-system.vercel.app/" />
          <meta name="twitter:title" content="Puto Order" />
          <meta name="twitter:description" content="Order delicious Puto online with ease" />
          <meta name="twitter:image" content="https://puto-order-system.vercel.app/icons/icon512_maskable.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Puto Order" />
          <meta property="og:description" content="Order delicious Puto online with ease" />
          <meta property="og:site_name" content="Puto Order" />
          <meta property="og:url" content="https://puto-order-system.vercel.app/" />
          <meta property="og:image" content="https://puto-order-system.vercel.app/icons/icon512_maskable.png" />

          {/* <link rel="apple-touch-startup-image" href="/images/apple_splash_2048.png" sizes="2048x2732" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1668.png" sizes="1668x2224" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1536.png" sizes="1536x2048" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1125.png" sizes="1125x2436" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_1242.png" sizes="1242x2208" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_750.png" sizes="750x1334" />
          <link rel="apple-touch-startup-image" href="/images/apple_splash_640.png" sizes="640x1136" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
