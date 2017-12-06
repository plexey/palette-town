import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Header from "../Header/Header.js";
import SideNav from "../SideNav/SideNav";
import Palette from "../Palette/Palette";
import Footer from "../Footer/Footer";
import Modal from "react-modal";
import PaletteColorData from "../ModalContent/PaletteColorData";
import "./App.css";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minWidthReached: undefined,
      isShowingModal: false,
      showSideNav: false,
      sideNavModalVisible: false
    };
  }

  static propTypes = {
    dataStore: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dataStore } = this.props;
    dataStore.generateNewPalatte();
    dataStore.retreiveFromLocalStorage();
    const mediaQuery = window.matchMedia(dataStore.minWidth);
    this.handleScreenWidthChange(mediaQuery); // check initial width
    mediaQuery.addListener(this.handleScreenWidthChange); // listen for width change

    document.addEventListener("keydown", event => {
      // If side nav open and esc key pressed, close side nav
      if (this.state.showSideNav === true && event.keyCode === 27) {
        this.toggleSideNav(false);
      }
      // if space bar pressed, get new palette
      if (event.keyCode === 32) {
        this.handleKeyPress();
      }
    });
  }

  handleKeyPress = () => {
    const { dataStore } = this.props;
    if (this.state.sideNavModalVisible === true) {
      return;
    }
    if (this.state.showSideNav === true) {
      return;
    } else {
      dataStore.getNext();
    }
  };

  handleScreenWidthChange = mediaQuery => {
    if (mediaQuery.matches) {
      this.setState({
        minWidthReached: false
      });
    } else {
      this.setState({
        minWidthReached: true
      });
    }
  };

  toggleSideNav = val => {
    this.setState({
      showSideNav: val
    });
  };

  handleClick = () => {
    this.setState({ isShowingModal: true });
  };

  handleClose = () => this.setState({ isShowingModal: false });

  toggleSideNavVisibility = () => {
    const { sideNavModalVisible } = this.state;
    if (sideNavModalVisible === true) {
      this.setState({
        sideNavModalVisible: false
      });
    }
    if (sideNavModalVisible === false) {
      this.setState({
        sideNavModalVisible: true
      });
    }
  };

  render() {
    const { dataStore } = this.props;
    const { showSideNav, minWidthReached } = this.state;
    return (
      <div className="App">
        <Header
          toggleSideNav={this.toggleSideNav}
          modalHandleClick={this.handleClick}
          dataStore={dataStore}
        />

        <SideNav
          dataStore={dataStore}
          showSideNav={showSideNav}
          toggleSideNav={this.toggleSideNav}
          toggleSideNavVisibility={this.toggleSideNavVisibility}
        />

        {dataStore.palette.length === 0 ? (
          "No data"
        ) : (
          <Palette minWidthReached={minWidthReached} dataStore={dataStore} />
        )}

        <Footer dataStore={dataStore} />

        <Modal
          isOpen={this.state.isShowingModal}
          onRequestClose={this.handleClose}
          contentLabel="Color Info Modal"
          className={{
            base: "colorModalDialog",
            afterOpen: "colorModalDialog_after-open",
            beforeClose: "colorModalDialog_before-close"
          }}
          overlayClassName={{
            base: "modalOverlay",
            afterOpen: "modalOverlay_after-open",
            beforeClose: "modalOverlay_before-close"
          }}
        >
          <PaletteColorData
            dataStore={dataStore}
            handleClose={this.handleClose}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
