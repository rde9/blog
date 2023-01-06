import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'

const NavBar = () => {
  const links = [
    { id: 0, name: 'Blog', to: BLOG.path || '/', show: true },
    { id: 1, name: 'About', to: '/about', show: BLOG.showAbout },
    { id: 2, name: 'RSS', to: '/feed', show: true },
    { id: 3, name: 'Search', to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-5xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
                  <path fill="#F4ABBA" d="M34.193 13.329a5.975 5.975 0 0 0 1.019-1.28c1.686-2.854.27-10.292-.592-10.8c-.695-.411-5.529 1.05-8.246 3.132C23.876 2.884 21.031 2 18 2c-3.021 0-5.856.879-8.349 2.367C6.93 2.293 2.119.839 1.424 1.249c-.861.508-2.276 7.947-.592 10.8c.278.471.615.884.989 1.249C.666 15.85 0 18.64 0 21.479C0 31.468 8.011 34 18 34s18-2.532 18-12.521c0-2.828-.66-5.606-1.807-8.15z"></path>
                  <path fill="#EA596E" d="M7.398 5.965c-2.166-1.267-4.402-2.08-4.8-1.845c-.57.337-1.083 4.998-.352 8.265a20.365 20.365 0 0 1 5.152-6.42zm26.355 6.419c.733-3.267.219-7.928-.351-8.265c-.398-.235-2.635.578-4.801 1.845a20.345 20.345 0 0 1 5.152 6.42zM28 23.125c0 4.487-3.097 9.375-10 9.375c-6.904 0-10-4.888-10-9.375S11.096 17.5 18 17.5c6.903 0 10 1.138 10 5.625z"></path>
                  <path fill="#662113" d="M15 24.6c0 1.857-.34 2.4-1.5 2.4s-1.5-.543-1.5-2.4c0-1.856.34-2.399 1.5-2.399s1.5.542 1.5 2.399zm9 0c0 1.857-.34 2.4-1.5 2.4s-1.5-.543-1.5-2.4c0-1.856.34-2.399 1.5-2.399s1.5.542 1.5 2.399z"></path>
                  <circle fill="#292F33" cx="7" cy="17" r="2"></circle>
                  <circle fill="#292F33" cx="29" cy="17" r="2"></circle>
                  </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
