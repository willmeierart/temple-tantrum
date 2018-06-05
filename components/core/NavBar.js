import Link from 'next/link'
import Routes from '../../server/routes'

const NavBar = ({ url, hoverCursor, ticketing }) => {
  const renderLinks = () => (
    Object.keys(Routes).reduce((list, route) => {
      const R = `/${route}`
      const active = (route === url.asPath.replace('/', ''))
      if (route !== 'home') {
        list.push(
          <li onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} key={route}>
            <Link href={R}>
              <a>{route.toUpperCase()}</a>
            </Link>
            <style jsx>{`
              li {
                color: white;
                font-size: .5em;
                font-family: 'Verlag-Book';
                letter-spacing: .2em;
                margin: 0 2em;
                text-align: center;
                text-align: center;
                line-height: 1.25em;
                padding: .25em;
                {/* text-decoration: ${active ? 'underline' : 'none'}; */}
                border-bottom: ${active ? '1px solid white' : 'none'}
              }
              a {
                
              }
            `}</style>
          </li>
        )
      }
      return list
    }, [])
  )
  return (
    <nav>
      <div className='navbar-inner'>
        <ul className='navlinks'>
          { renderLinks() }
          <li onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} className='get-tickets'>
            <a href={ticketing.url}>GET TICKETS</a>
          </li>
          { !ticketing.avail && <div className='coming-soon-wrapper'>
            <img src='/static/images/coming_soon.png' />
          </div> }
        </ul>
      </div>
      <style jsx>{`
        nav {
          width: 100%;
          z-index: 6;
        }
        .navbar-inner {
          display: flex;
          justify-content: flex-end;
        }
        .navlinks {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          {/* width: 75%; */}
        }
        .get-tickets {
          color: white;
          font-size: .5em;
          font-family: 'Verlag-Book';
          padding: 1em;
          background: #F96E3E;
          letter-spacing: .2em;
          white-space: nowrap;
        }
        .coming-soon-wrapper {
          position: absolute;
          right: 6vw;
          bottom: 60px;
          display: flex;
          justify-content: flex-end;
        }
        .coming-soon-wrapper img {
          width: 60%;
          height: 60%;
        }
      `}</style>
    </nav>
  )
}

export default NavBar
