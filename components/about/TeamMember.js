const TeamMember = ({ member, L, isLast, isThin }) => {
  console.log(isThin)
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
          {/* height: 25vh; */}
          position: relative;
          margin: 2em;
          border-bottom: ${!isLast && '1px solid darkred'}
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
        img {
          height: 20vh;
        }
      `}</style>
    </div>
  )
}

export default TeamMember
