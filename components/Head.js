// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'

const initialProps = {
  title: "We're throwing a fit",
  initialScale: '1.0',
  description: "Temple Tantrum Fest - We're throwing a fit!"
}

const CustomHead = (props = initialProps) => {
  const { title, initialScale, description } = props
  return <Head>
    <title key='title'>{title}</title>
    <meta key='charset' charSet='utf-8' />
    <meta key='viewport' name='viewport' content={`initial-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`} />
    <meta key='meta-title' name='title' content='Temple Tantrum' />
    <meta key='description' name='Description' content={description} />
    <meta name="google-site-verification" content="T_HAOmNiSb09O9WdkS2IMLf7ac7fuLjdGgHvC6EWdEA" />
    <link rel='shortcut icon' href='/static/favicon.ico' />
    <script defer src='https://use.fontawesome.com/releases/v5.0.6/js/all.js' />
    <style dangerouslySetInnerHTML={{__html: `
      @font-face {
        font-family: 'Verlag-Black';
        src: url('/static/fonts/Verlag-Black.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Verlag-Book';
        src: url('/static/fonts/Verlag-Book.eot');
        src: url('/static/fonts/Verlag-Book.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Leafy';
        src: url('/static/fonts/leafy.woff');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Euphorigenic';
        src: url('/static/fonts/Euphorigenic-Regular.woff');
        font-weight: normal;
        font-style: normal;
      }
    `}} />
  </Head>
}

export default CustomHead
