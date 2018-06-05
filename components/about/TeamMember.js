const TeamMember = ({ member, L, isLast, isThin }) => {
  const { bio, image, name, tagline } = member
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='module'>
          <div className='tagline'>{tagline}</div>
          <img src={image.url} />
          <div className='name'>{name}</div>
        </div>
        <div className='bio'>{bio}</div>
      </div>
      <style jsx>{`
        .outer-container {
          position: relative;
          margin: 2em;
        }
        .inner-container {
          display: flex;
          flex-direction: ${isThin ? 'column' : L ? 'row' : 'row-reverse'};
          justify-content: space-around;
          align-items: center;
          position: relative;
          color: white;
          font-family: leafy;  
          height: 100%; 
          margin-bottom: 2em;
        }
        .module {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          object-fit: contain;
          margin: 2em;
        }
        .tagline {
          font-size: 2em;
        }
        img {
          height: 20vh;
        }
        .name, .bio {
          font-family: 'Verlag-Book';
        }
      `}</style>
    </div>
  )
}

export default TeamMember
