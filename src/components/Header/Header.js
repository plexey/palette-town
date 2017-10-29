import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HeaderButton from '../Elements/HeaderButton.js';
import DropDownList from '../Elements/DropDownList.js';
import KeyHandler, {KEYDOWN} from 'react-key-handler';
import PropTypes from 'prop-types';
import './Header.css';

@observer
class Header extends Component {
  static propTypes = {
    dataStore: PropTypes.object,
  }
  render() {
    const { dataStore } = this.props;
    return (
      <div className="header">
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={() => dataStore.getPrevious()} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={() => dataStore.getNext()} />
        <h1 className="brand-name">Palette Town</h1>

        <DropDownList dataStore={dataStore}/>

        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.concatColors()}
          fontAwesomeIcon={'plus'}
          buttonText={'New'}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.getPrevious()}
          fontAwesomeIcon={'arrow-left'}
          buttonText={'Previous'}
        />
        <HeaderButton
          dataStore={dataStore}
          btnFunction={() => dataStore.getNext()}
          fontAwesomeIcon={'arrow-right'}
          buttonText={'Next'}
        />
        <HeaderButton
          className="card-buttons"
          dataStore={dataStore}
          btnFunction={() => dataStore.deletePalatte()}
          fontAwesomeIcon={'trash-o'}
          buttonText={'Delete'}
        />
        <HeaderButton
          className="card-buttons"
          dataStore={dataStore}
          btnFunction={() => dataStore.deletePalatte()}
          fontAwesomeIcon={'download'}
          buttonText={'Download'}
        />
      </div>
    );
  }
}

export default Header;
