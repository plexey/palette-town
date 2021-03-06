import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Category.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      contentMaxHeight: undefined
    };
  }

  componentDidMount() {
    this.updateContentMaxHeight();
  }

  componentDidUpdate() {
    this.updateContentMaxHeight();
  }

  updateContentMaxHeight = () => {
    const { categoryItems } = this.props;
    if (categoryItems.length > 0) {
      const newHeight =
        this.contentDiv.childNodes[0].offsetHeight * categoryItems.length;
      if (newHeight !== this.state.contentMaxHeight) {
        this.setState({
          contentMaxHeight: newHeight
        });
      }
    }
  };

  toggleIsExpanded = () => {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: isExpanded === true ? false : true
    });
  };

  static propTypes = {
    categoryName: PropTypes.string,
    categoryItems: PropTypes.array
  };

  render() {
    const { isExpanded, contentMaxHeight } = this.state;
    const { categoryName, categoryItems } = this.props;
    const contentStyle = {
      maxHeight: isExpanded === true ? contentMaxHeight + "px" : 0
    };
    return (
      <div className={styles.container}>
        <h2 className={styles.heading} onClick={this.toggleIsExpanded}>
          {categoryName}
          <i
            className={classNames({
              ["material-icons"]: true,
              [styles.icon]: true,
              [styles.rotate]: isExpanded
            })}
          >
            arrow_drop_down
          </i>
        </h2>
        <div
          ref={contentDiv => (this.contentDiv = contentDiv)}
          className={styles.content}
          style={contentStyle}
        >
          {categoryItems.length > 0 && categoryItems}
        </div>
      </div>
    );
  }
}

export default Category;
