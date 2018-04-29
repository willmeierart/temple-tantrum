import PropTypes from 'prop-types'
import { Facebook, Instagram, Twitter } from './assets/Socials'
import Link from 'next/link'

const Socials = props => {
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='follow-us'>FOLLOW US</div>
        <div className='icons-wrapper'>
          <a href='https://facebook.com'>
            <Facebook />
          </a>
          <a href='https://instagram.com'>
            <Instagram />
          </a>
          <a href='https://twitter.com'>
            <Twitter />
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
          width: 100px;
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
