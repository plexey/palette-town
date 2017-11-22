import React, { Component } from "react";
import { observer } from "mobx-react";
import FontAwesome from "react-fontawesome";
import "./HeaderButton.css";
import PropTypes from "prop-types";

@observer
class HeaderButton extends Component {
  static propTypes = {
    btnFunction: PropTypes.func,
    fontAwesomeIcon: PropTypes.string,
    overlayValue: PropTypes.number,
    isActive: PropTypes.bool
  };
  render() {
    const { btnFunction, fontAwesomeIcon, overlayValue, isActive } = this.props;
    const style = {
      color: "hsl(310, 100%, 50%)"
    };
    const altStyle = {

    }
    return (
      <button className="header-button" onClick={btnFunction}>
        <FontAwesome
          style={isActive === true ? style : altStyle}
          className="header-icon"
          name={fontAwesomeIcon}
          size="2x"
        />
        {overlayValue > 0 ? (
          <p className="indicator-overlay">{overlayValue}</p>
        ) : (
          ""
        )}
      </button>
    );
  }
}

export default HeaderButton;