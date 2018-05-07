import TeamMember from './TeamMember'

const TeamSection = ({ team }) => {
  const teamList = team.map((member, i) => <TeamMember key={i} L={i % 2 === 0} member={member} />)
  return (
    <div className='outer-container'>
      <div className='inner-container'> { teamList }</div>
      <style jsx>{`
        .outer-container {
          margin-top: 25vh;
          height: 60vh;
        }
        .inner-container {}
      `}</style>
    </div>
  )
}

export default TeamSection
