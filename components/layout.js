import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import utilStyles from '../styles/utils.module.css';
import styles from './layout.module.css';

const name = 'Hannah';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  const [theme, setTheme] =useState('light');

  const themeIcon = () => <Image
  priority
  src={theme==="light" ? "/icons/sun.svg" :"/icons/moon.svg"}
  className={styles.theme}
  height={30}
  width={30}
  alt=""
  onClick={()=>{
    const isLight = theme==="light" ;
    setTheme(isLight ? "dark" : "light");
    document.body.classList.toggle("dark-theme")

  }}
/>

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap" rel="stylesheet" />
      </Head>

    <div className={styles.layout}>
      <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/cat.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
              {themeIcon()}
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/cat.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt=""
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name}
                </Link>
              </h2>
              {themeIcon()}
            </>
          )}
        </header>
        <main className={styles.content}>{children}</main>
        <aside className={classNames(styles.sidebar, utilStyles.flexBox)}>sidebar</aside>
        {!home && (
          <footer className={styles.footer}>
            <Link href="/" className={styles.flexBox}>
              <Image priority
                src="/icons/left-arrow.svg"
                className={styles.backIcon}
                height={30}
                width={30}
                alt=""/> Back to home</Link>
            </footer>
        )}
    </div>
    </div>
  );
}
