import PropTypes from 'prop-types'
import { Facebook, Instagram, Twitter, Youtube } from '../assets/Socials'
import Link from 'next/link'

const Socials = ({ socials, hoverCursor }) => {
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='follow-us'>FOLLOW US</div>
        <div className='icons-wrapper'>
          <a onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} href={socials.fb}>
            <Facebook />
          </a>
          <a onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} href={socials.ig}>
            <Instagram />
          </a>
          <a onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} href={socials.tw}>
            <Twitter />
          </a>
          <a onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} href={socials.yt}>
            <Youtube />
          </a>
        </div>
      </div>
      <style jsx>{`
        .outer-container {}
        .inner-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 120px;
          font-size: .5em;
        }
        .icons-wrapper {
          padding-top: 1em;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        a {
          {/* cursor: pointer; */}
        }

      `}</style>
    </div>
  )
}

Socials.propTypes = {}

export default Socials
