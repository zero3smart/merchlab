import React from 'react';
import './MainLayout.scss';
import logo from '../../images/jinglz__logo.png';
import ic_active from '../../images/icons/main/ic_campaigns_active.png';
import ic_archived from '../../images/icons/main/ic_campaigns_archived.png';
import ic_completed from '../../images/icons/main/ic_campaigns_completed.png';
import ic_inreview from '../../images/icons/main/ic_campaigns_inreview.png';
import ic_account from '../../images/icons/main/ic_account.png';
import ic_help from '../../images/icons/main/ic_help.png';
import ic_contact from '../../images/icons/main/ic_contact.png';
import ic_settings from '../../images/icons/main/ic_settings.png';

import { Link } from 'react-router';

export default class Main extends React.Component {

  handlePopupDisplay = (e) => {
    if (e.target !== this.popupItem && !this.accountItem.contains(e.target)) {
      this.props.mainLayout.accountPopupFlag ? this.props.changeAccountPopupVisibility() : console.log();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handlePopupDisplay);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePopupDisplay);
  }

  render() {
    let popupStyle, popupItemStyle;

    if (!this.props.mainLayout.accountPopupFlag) {
      popupStyle = {opacity: '0', height: 20};
      popupItemStyle = {display: 'none'};
    } else {
      popupStyle = {opacity: '1', height: 110};
    }

    return(
    <div style={(this.props.showUploadVideoFlag || this.props.showNewCampaignFlag) ? {height: 0} : {height: '100%'}}>
      <div className="main">
        <div className="header">
          <div className="header__container">
            <div className="header__logo">
              <img src={logo} alt="logo"/>
            </div>

            <div className="header__company_name">
              <div className="company_name__container">
                <span style={{display: 'none'}} className="company_name__text">{(this.props.currentUser && this.props.currentUser.user) ? this.props.currentUser.user.companyName : ""}</span>
              </div>
            </div>

            <div className="header__navbar">
              <ul>
                <li className="header__nav">
                    <button className="header__add-new" onClick={() => this.props.showUploadVideo(true)}>New Campaign</button>
                </li>
                <li className="header__nav">
                  <Link to="/main/contact">
                    <img src={ic_contact} alt="ic_contact"/>
                    <span>Contact us</span>
                  </Link>
                </li>
                <li className="header__nav">
                  <Link to="/main/help">
                    <img src={ic_help} alt="ic_help"/>
                    <span>Help</span>
                  </Link>
                </li>
                <li className="header__nav" ref={(e) => this.accountItem = e} onClick={this.props.changeAccountPopupVisibility}>
                  <img src={ic_account} alt="ic_account"/>
                  <span>Account</span>
                </li>
              </ul>
            </div>

            <div className="header__popup" style={popupStyle} ref={(e) => this.popupItem = e}>
              <div className="header__popup_text" style={popupItemStyle}>
                <img src={ic_settings} alt="ic_settings" />
                <Link to="/main/settings">
                  <span>Account settings</span>
                </Link>
              </div>
              <div className="header__popup_button" style={popupItemStyle}>
                <button onClick={() => this.props.logOut()}>Log out</button>
              </div>
            </div>

          </div>
        </div>

        <div className="left-panel">
          <div className="left-panel__menu">
            <div className="left-panel__header">
              CAMPAIGNS
            </div>
            <ul>
              <li>
                <Link to="/main"
                  className={this.props.location.pathname === '/main' || this.props.location.pathname === '/main/'
                    ? "left-panel__item left-panel__item_active"
                    : "left-panel__item"}>
                  <img src={ic_active} alt="ic_active"/>
                  <span>Active</span>
                </Link>
              </li>
              <li>
                <Link to="/main/inreview"
                  className={this.props.location.pathname === '/main/inreview'
                    ? "left-panel__item left-panel__item_active"
                    : "left-panel__item"}>
                  <img src={ic_inreview} alt="ic_inreview"/>
                  <span>In review</span>
                </Link>
              </li>
              <li>
                <Link to="/main/completed"
                  className={this.props.location.pathname === '/main/completed'
                    ? "left-panel__item left-panel__item_active"
                    : "left-panel__item"}>
                  <img src={ic_completed} alt="ic_completed"/>
                  <span>Completed</span>
                </Link>
              </li>
              <li>
                <Link to="/main/archived"
                  className={this.props.location.pathname === '/main/archived'
                    ? "left-panel__item left-panel__item_active"
                    : "left-panel__item"}>
                  <img src={ic_archived} alt="ic_archived"/>
                  <span>Archived</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="main__layout">
          <div className="main__container">
              {this.props.children}
          </div>
        </div>

      </div>

      { (this.props.showUploadVideoFlag || this.props.showNewCampaignFlag) &&
        <div className="modal_opacity"></div>
      }
      { this.props.showUploadVideoFlag &&
        <UploadVideo />
      }
      { this.props.showNewCampaignFlag &&
        <NewCampaign />
      }

      </div>
    );
  }
}