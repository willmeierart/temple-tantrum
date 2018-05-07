const TeamMember = ({ member, L }) => {
  const { bio, image, name } = member
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='module'>
          <div className='name'>{name}</div>
          <img src={image.url} />
        </div>
        <div className='bio'>{bio}</div>
      </div>
      <style jsx>{`
        .outer-container {
          height: 25vh;
          position: relative;
          margin: 2em;
        }
        .inner-container {
          display: flex;
          flex-direction: ${L ? 'row' : 'row-reverse'};
          justify-content: center;
          align-items: center;
          position: relative;
          color: white;
          font-family: leafy;  
          height: 100%;    
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
        img {
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default TeamMember
