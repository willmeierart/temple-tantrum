import Link from 'next/link'
import Routes from '../../server/routes'

const NavBar = () => {
  const renderLinks = () => (
    Object.keys(Routes).map((routeName, i) => {
      const R = routeName === 'home' ? '/' : `/${routeName}`
      return (
        <li>
          <Link key={i} href={R}>
            <a>{routeName.toUpperCase()}</a>
          </Link>
          <style jsx>{`
            li {
              color: white;
              font-size: .5em;
              font-family: 'Verlag-Book';
              letter-spacing: .2em;
              margin: 0 2em;
            }
          `}</style>
        </li>
      )
    })
  )
  return (
    <nav>
      <div className='navbar-inner'>
        <ul className='navlinks'>
          { renderLinks() }
          <li className='get-tickets'>
            <a href='#'>GET TICKETS</a>
          </li>
          <div className='coming-soon-wrapper'>
            <img src='/static/images/coming_soon.png' />
          </div>
        </ul>

      </div>
      <style jsx>{`
        nav {
          width: 100%;
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
        }
        .coming-soon-wrapper {
          position: absolute;
          right: 0;
          bottom: 30px;
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
