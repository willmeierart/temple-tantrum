import gql from 'graphql-tag'

export const aboutPage = gql`
  query aboutPage {
    allAboutPages {
      header
      description
    }
  }
`

export const homePage = gql`
  query homePage {
    allHomeTextBoxes {
      title
      body
      backgroundText
      linktext
      linkURL
    }
    allSponsorses {
      link
      logo {
        url
      }
    }
    allGenerals (first: 1) {
      day1Time
      day2Time
      facebookLink
      instagramLink
      ticketsAvailable
      ticketingURL
      twitterLink
      youtubeLink
    }
  }
`

export const causePage = gql`
  query causePage {
    allCausePages (first: 1) {
      header
      body
    }
    allSponsorses {
      link
      logo {
        url
      }
    }
  }
`

export const contactInfo = gql`
  query contactInfo {
    allContactInfoes (first: 1) {
      email
      volunteerFormLink
    }
  }
`

export const general = gql`
  query general {
    allGenerals (first: 1) {
      day1Time
      day2Time
      facebookLink
      instagramLink
      ticketingURL
      twitterLink
      youtubeLink
      ticketsAvailable
    }
    allSponsorses {
      link
      logo {
        url
      }
    }
  }
`

export const livePage = gql`
  query livePage {
    allLivePages (first: 1) {
      artistLineup {
        url
      }
      entertainmentLineup {
        url
      }
      musicLineup {
        url
      }
    }
    allGenerals (first: 1) {
      day1Time
      day2Time
    }
  }
`

export const allPrograms = gql`
  query allPrograms {
    allProgramses {
      dateTime
      image {
        url
      }
      link
      title
      type
      timeVisibility
    }
    allSponsorses {
      link
      logo {
        url
      }
    }
  }
`

export const allSponsors = gql`
  query allSponsors {
    allSponsorses {
      link
      logo {
        url
      }
    }
  }
`

export const team = gql`
  query team {
    allTeams {
      image {
        url
      }
      name
      bio
    }
  }
`
