import TeamMember from './TeamMember'

const TeamSection = ({ team, isThin }) => {
  const teamList = team.map((member, i) => <TeamMember isThin={isThin} isLast={i === team.length - 1} key={i} L={i % 2 === 0} member={member} />)
  return (
    <div className='outer-container'>
      {/* <h1 className='team-title'>OUR TEAM</h1> */}
      <div className='inner-container'> { teamList }</div>
      <style jsx>{`
        .outer-container {
        }
        .team-title {
          text-align: center;
          color: white;
          font-family: leafy;
          font-size: 2em;
          letter-spacing: 0.06125em;
        }
        .inner-container {}
      `}</style>
    </div>
  )
}

export default TeamSection
