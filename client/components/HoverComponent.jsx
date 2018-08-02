import React from 'react';
import Schedule from './Schedule.jsx';
import Modal from 'react-responsive-modal';

class HoverComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similarModalOpen: false,
      watchNowModalOpen: false,
      watchLaterModalOpen: false,
    };
    this.onOpenSimilarModal = this.onOpenSimilarModal.bind(this);
    this.onCloseSimilarModal = this.onCloseSimilarModal.bind(this);
    this.onOpenWatchNowModal = this.onOpenWatchNowModal.bind(this);
    this.onCloseWatchNowModal = this.onCloseWatchNowModal.bind(this);
    this.onOpenWatchLaterModal = this.onOpenWatchLaterModal.bind(this);
    this.onCloseWatchLaterModal = this.onCloseWatchLaterModal.bind(this);

  }
  onOpenSimilarModal() {
    this.setState({
      similarModalOpen: true
    });
  }

  onCloseSimilarModal() {
    this.setState({
      similarModalOpen: false
    });
  }

  onOpenWatchNowModal() {
    this.setState({
      watchNowModalOpen: true
    });
  }

  onCloseWatchNowModal() {
    this.setState({
      watchNowModalOpen: false
    });
  }

  onOpenWatchLaterModal() {
    this.setState({
      watchLaterModalOpen: true
    });
  }

  onCloseWatchLaterModal() {
    this.setState({
      watchLaterModalOpen: false
    });
  }





  render() {
    return (
      <div className="options">
        <a onClick={ () => this.onOpenSimilarModal() } class="button is-primary">See Similar!</a>
        <a onClick={ () => this.onOpenWatchNowModal() }class="button is-primary">Watch Now!</a>
        <a onClick={ () => this.onOpenWatchLaterModal() }class="button is-primary">Watch Later!</a>
        <Modal open={this.state.similarModalOpen} onClose={this.onCloseSimilarModal} center>
          <h1>SEE SIMILAR TREE!</h1>
        </Modal>
        <Modal open={this.state.watchNowModalOpen} onClose={this.onCloseWatchNowModal} center>
          <h1>SEE WATCH NOW OPTIONS!</h1>
        </Modal>
        <Modal open={this.state.watchLaterModalOpen} onClose={this.onCloseWatchLaterModal} center>
          <Schedule user={this.props.user} movie={this.props.movie} closeModal={this.onCloseWatchLaterModal}/>
        </Modal>
        {/* <p>See Similar</p>
          <p>Watch Now</p> */}
          {/* <div><Schedule user={this.props.user} movie={this.props.movie}/></div> */}
        </div>
    );
  }

}


export default HoverComponent;
