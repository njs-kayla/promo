import '@/assets/fonts/icomoon/style.css';
import '@/assets/scss/app.scss';
import ThemeProvider from '@/store/theme-provider';
import ReduxProvider from '@/store/redux-provider';

export async function generateMetadata() {
  const brand = process.env.NEXT_PUBLIC_BRAND?.toLowerCase() || 'fs';
  const favicon = `/${brand}_favicon.ico`;
  const title = brand === 'fs' ? 'Fastspin' : 'Spade Promotion';

  return {
    title,
    icons: {
      icon: favicon,
    },
  };
}

function RootLayout({ children }) {

  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
export default RootLayout;