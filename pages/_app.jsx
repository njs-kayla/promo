import ReduxProvider from '@/store/redux-provider';
import ThemeProvider from '@/store/theme-provider';
import '@/assets/scss/app.scss';
import '@/assets/fonts/icomoon/style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  )
}
