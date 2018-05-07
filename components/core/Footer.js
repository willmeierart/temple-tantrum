import Link from 'next/link'

const stockSponsors = [
  {
    link: 'http://meowwolf.com',
    logo: {
      url: '/static/images/logos/meowwolf.png'
    },
    name: 'Meowwolf'
  },
  {
    link: 'http://platteforum.com',
    logo: {
      url: '/static/images/logos/pforum.png'
    },
    name: 'Platte Forum'
  },
  {
    link: 'http://temple.com',
    logo: {
      url: '/static/images/logos/temple.png'
    },
    name: 'The Temple'
  },
  {
    link: 'http://twoparts.com',
    logo: {
      url: '/static/images/logos/twoparts.png'
    },
    name: 'Two Parts'
  }
]

const Footer = ({ sponsors, hoverCursor }) => {
  const SPONSORS = sponsors && sponsors.length > 0 ? sponsors : stockSponsors
  const renderList = () => SPONSORS.map(sponsor => (
    <div onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} key={sponsor.name} className='link-wrapper'>
      <Link href={sponsor.link}>
        <a><img src={sponsor.logo.url} alt={sponsor.name} /></a>
      </Link>
      <style jsx>{`
        .link-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        img {
          max-height: 70px;
          mix-blend-mode: darken;
          max-width: 33vw;
        }
      `}</style>
    </div>
  ))
  return (
    <div className='footer-outer'>
      <div className='footer-inner'>
        { renderList() }
      </div>
      <style jsx>{`
        .footer-outer {
          height: 100%;
          z-index: 1030000000000;
          background: linear-gradient(to bottom, rgba(255,255,255,.66), rgba(255,255,255,1));
        }
        .footer-inner {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default Footer
