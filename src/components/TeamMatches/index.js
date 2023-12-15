import {Component} from 'react'
import {PieChart, Pie, Tooltip, Legend} from 'recharts'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    recentMatchesData: {},
  }

  componentDidMount() {
    this.getRecentMatches()
  }

  setRecentMatches = (formattedData, isLoading) => {
    this.setState({recentMatchesData: formattedData, isLoading})
  }

  getRecentMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    this.setRecentMatches(formattedData, false)
  }

  renderPieChart = () => {
    const {recentMatchesData} = this.state
    const {recentMatches} = recentMatchesData

    // Calculate statistics for the pie chart
    const won = recentMatches.filter(match => match.matchStatus === 'Won')
      .length
    const lost = recentMatches.filter(match => match.matchStatus === 'Lost')
      .length
    const drawn = recentMatches.filter(match => match.matchStatus === 'Drawn')
      .length

    const data = [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]

    return (
      <div className="pie-chart-container">
        <h2 className="pie-chart-heading">Match Statistics</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {recentMatchesData} = this.state
    const {recentMatches} = recentMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchData={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {recentMatchesData} = this.state
    const {teamBannerURL, latestMatch} = recentMatchesData

    return (
      <div className="team-matches-container">
        <Link to="/" className="link-item">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderPieChart()}
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height="50" />
      <Link to="/" className="link-item">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>
    </div>
  )

  // import {Component} from 'react'
  // import {PieChart, Pie, Tooltip} from 'recharts'
  // import Loader from 'react-loader-spinner'
  // import {Link} from 'react-router-dom'

  // import LatestMatch from '../LatestMatch'
  // import MatchCard from '../MatchCard'

  // import './index.css'

  // const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

  // class TeamMatches extends Component {
  //   state = {
  //     isLoading: true,
  //     recentMatchesData: {},
  //   }

  //   componentDidMount() {
  //     this.getRecentMatches()
  //   }

  //   setRecentMatches = (formattedData, isLoading) => {
  //     this.setState({recentMatchesData: formattedData, isLoading})
  //   }

  //   getRecentMatches = async () => {
  //     const {match} = this.props
  //     const {params} = match
  //     const {id} = params

  //     const response = await fetch(`${teamMatchesApiUrl}${id}`)
  //     const fetchedData = await response.json()
  //     const formattedData = {
  //       teamBannerURL: fetchedData.team_banner_url,
  //       latestMatch: {
  //         umpires: fetchedData.latest_match_details.umpires,
  //         result: fetchedData.latest_match_details.result,
  //         manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
  //         id: fetchedData.latest_match_details.id,
  //         date: fetchedData.latest_match_details.date,
  //         venue: fetchedData.latest_match_details.venue,
  //         competingTeam: fetchedData.latest_match_details.competing_team,
  //         competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
  //         firstInnings: fetchedData.latest_match_details.first_innings,
  //         secondInnings: fetchedData.latest_match_details.second_innings,
  //         matchStatus: fetchedData.latest_match_details.match_status,
  //       },
  //       recentMatches: fetchedData.recent_matches.map(recentMatch => ({
  //         umpires: recentMatch.umpires,
  //         result: recentMatch.result,
  //         manOfTheMatch: recentMatch.man_of_the_match,
  //         id: recentMatch.id,
  //         date: recentMatch.date,
  //         venue: recentMatch.venue,
  //         competingTeam: recentMatch.competing_team,
  //         competingTeamLogo: recentMatch.competing_team_logo,
  //         firstInnings: recentMatch.first_innings,
  //         secondInnings: recentMatch.second_innings,
  //         matchStatus: recentMatch.match_status,
  //       })),
  //     }
  //     this.setRecentMatches(formattedData, false)
  //   }

  //   renderPieChart = () => {
  //     const {recentMatchesData} = this.state
  //     const {recentMatches} = recentMatchesData

  //     // Calculate statistics for the pie chart
  //     const won = recentMatches.filter(match => match.matchStatus === 'Won')
  //       .length
  //     const lost = recentMatches.filter(match => match.matchStatus === 'Lost')
  //       .length
  //     const drawn = recentMatches.filter(match => match.matchStatus === 'Drawn')
  //       .length

  //     const data = [
  //       {name: 'Won', value: won},
  //       {name: 'Lost', value: lost},
  //       {name: 'Drawn', value: drawn},
  //     ]

  //     return (
  //       <div className="pie-chart-container">
  //         <h2 className="pie-chart-heading">Match Statistics</h2>
  //         <PieChart width={300} height={300}>
  //           <Pie
  //             data={data}
  //             dataKey="value"
  //             nameKey="name"
  //             cx="50%"
  //             cy="50%"
  //             outerRadius={80}
  //             fill="#8884d8"
  //             label
  //           />
  //           <Tooltip />
  //         </PieChart>
  //       </div>
  //     )
  //   }

  //   renderRecentMatchesList = () => {
  //     const {recentMatchesData} = this.state
  //     const {recentMatches} = recentMatchesData

  //     return (
  //       <ul className="recent-matches-list">
  //         {recentMatches.map(recentMatch => (
  //           <MatchCard matchData={recentMatch} key={recentMatch.id} />
  //         ))}
  //       </ul>
  //     )
  //   }

  //   renderTeamMatches = () => {
  //     // const {match} = this.props
  //     // const {params} = match
  //     // const {id} = params
  //     const {recentMatchesData} = this.state
  //     const {teamBannerURL, latestMatch} = recentMatchesData

  //     return (
  //       <div className="team-matches-container">
  //         <Link to="/" className="link-item">
  //           <button type="button" className="back-button">
  //             Back
  //           </button>
  //         </Link>
  //         <img src={teamBannerURL} alt="team banner" className="team-banner" />
  //         <LatestMatch latestMatchData={latestMatch} />
  //         {this.renderPieChart()}
  //         {this.renderRecentMatchesList()}
  //       </div>
  //     )
  //   }

  //   renderLoader = () => (
  //     <div className="loader-container">
  //       <Loader testid="loader" type="Oval" color="#ffffff" height="50" />
  //       <Link to="/" className="link-item">
  //         <button type="button" className="back-button">
  //           Back
  //         </button>
  //       </Link>
  //     </div>
  //   )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-route-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
