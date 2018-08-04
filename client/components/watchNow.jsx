import React from 'react';
import axios from 'axios';
class WatchNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itunesData: null
    };
  }

  componentDidMount() {
    
    axios.get('/price', {
      params: {
        term: this.props.movie.original_title
      }
    })
      .then(results => {
        console.log(results);
        this.setState({itunesData: results.data[0]});        
      });
  }

  render() {
    return (
      <div>
        {this.state.itunesData !== null ? 
          <div id="watchNow" className='form-style-6'>
            <h1 id="wnTitle">{this.state.itunesData.trackName}</h1>
            <iframe src={this.state.itunesData.previewUrl}></iframe>
            <br></br>
            <a className="wnLink" href={this.state.itunesData.trackViewUrl} target="_blank">Rent on iTunes for {this.state.itunesData.trackHdRentalPrice}</a>
            <br></br>
            <a className="wnLink" href={"https://thepiratebay.org/search/"+this.state.itunesData.trackName.split(" ").join("+")} target="_blank">Don't rent on iTunes</a>
          </div> : '' }
      </div>
    );
  }
}

export default WatchNow;
