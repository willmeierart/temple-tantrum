import Routes from '../../server/routes'
import Link from 'next/link'

const Menu = ({ hoverCursor, ticketing }) => {
  const renderList = () =>
    Object.keys(Routes).map((route, i) => {
      const R = route === 'home' ? '/' : `/${route}`
      return (
        <li key={route}>
          <Link href={R}>
            <a onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }}>{route.toUpperCase()}</a>
          </Link>
          <style jsx>{`
            li {
              color: white;
              font-size: 2em;
              font-family: 'Verlag-Book';
              letter-spacing: .2em;
              margin: 0 2em;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              flex-grow: 1;
              line-height: 1.25em;
              padding: .25em;
              border-bottom: 1px solid white;
              // border-bottom: ${i !== Object.keys(Routes).length - 1 ? '1px solid white' : 'none'};
              width: 100vw;
            }
          `}</style>
        </li>
      )
    })
  return (
    <div className='menu-outer'>
      <div className='menu-inner'>
        <ul>
          { renderList() }
          <li onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} className='get-tickets'>
            <a href={ticketing.url}>GET TICKETS</a>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .menu-outer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #f8d147;
          z-index: 11;
          
        }
        .menu-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          padding: 0;
        }
        li {
              color: white;
              font-size: 2em;
              font-family: 'Verlag-Book';
              letter-spacing: .2em;
              margin: 0 2em;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              flex-grow: 1;
              line-height: 1.25em;
              padding: .25em;
              width: 100vw;
            }
      `}</style>
    </div>
  )
}

export default Menu
