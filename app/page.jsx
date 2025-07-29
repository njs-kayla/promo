'use client'
import { useContext, useEffect } from 'react'
import styles from '@/assets/scss/page/forbidden.module.scss';
import { ThemeContext } from '@/store/theme-context'
import Link from 'next/link';

export const metaData = {
  title: 'Oops!',
  description: 'Oops!'
}

export default function Forbidden() {
  const { setThemeCode } = useContext(ThemeContext);

  useEffect(() => {
    setThemeCode('forbidden')
  })

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.forbidden_sign}></div>
        <h1>Access to this page is restricted.</h1>
        <p>Ensure you have sufficient permissions to access the same.</p>
        <Link href="/projectFilesList">
          Return to index page
        </Link>
      </div>
    </main>
  )
}
