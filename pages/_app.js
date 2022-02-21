import "../styles/globals.scss";

/* Function that works like middleware
 * when loading any page in the folder,
 * allowing to add global styles
 * @param component the page component
 * @param pageProps the props that have the page
 * @return page with global styles
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
