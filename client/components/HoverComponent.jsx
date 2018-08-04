import React from 'react';
import Schedule from './Schedule.jsx';
import WatchNow from './watchNow.jsx';
import Modal from 'react-responsive-modal';
import TreeMode from './Tree/TreeMode.jsx';
import './Tree/styles/TreeMode.css';



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
    this.props.onHideOptions();
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
    this.props.onHideOptions();
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
    this.props.onHideOptions();

  }

  render() {
    return (
      <div className="options">
        <a onClick={ () => this.onOpenSimilarModal() } class="button is-primary">See Similar!</a>
        <a onClick={ () => this.onOpenWatchNowModal() }class="button is-primary">Watch Now!</a>
        <a onClick={ () => this.onOpenWatchLaterModal() }class="button is-primary">Watch Later!</a>

        <Modal
          // className='treeModal'
          open={this.state.similarModalOpen}
          onClose={this.onCloseSimilarModal}
          // center
        >
          <TreeMode
            moods={this.props.moods}
          />

        </Modal>
        <Modal open={this.state.watchNowModalOpen} onClose={this.onCloseWatchNowModal} center>
          <WatchNow movie={this.props.movie} />
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
