import Link from 'next/link'
import NavBar from './NavBar'

const Header = ({ url, mobileMenu, hoverCursor, ticketing }) => (
  <div className='header-outer'>
    <div className='header-inner'>
      <Link href='/'>
        <div className='logo-wrapper'>
          <img alt='temple tantrum fest logo' onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} src='/static/images/logos/tt.png' />
        </div>
      </Link>
      { !mobileMenu && <NavBar ticketing={ticketing} hoverCursor={hoverCursor} url={url} /> }
      
    </div>
    <style jsx>{`
      .header-outer {
        z-index: 11;
        position: absolute;
        width: 100%;
      }
      .header-inner {
        padding: 4em 10vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo-wrapper {
        cursor: pointer;
      }
      
    `}</style>
  </div>
)

export default Header
