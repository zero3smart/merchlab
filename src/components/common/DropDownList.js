import React from 'react';
import data from './dropDownData';

export default class DropDownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderFlag: false,
      listFlag: false,
      selected: '',
      itemList: [],
    };
  }

  handleSelect = (el) => {
    this.setState({
      selected: el[0].toUpperCase()+el.slice(1),
      placeholderFlag: true,
      listFlag: false,
    }, () => {
      this.blur();
    });

    if (this.props.onChange && this.props.actionType) {
      this.props.onChange(this.props.actionType, el);
    } else if (this.props.onChange) {
      this.props.onChange(el);
    }
  }

  componentDidMount() {
    if (this.props.state) {
     this.setState({
       selected: this.props.state,
       placeholderFlag: true,
      });
    }

    if (this.props.age) {
     this.setState({
       selected: this.props.age,
       placeholderFlag: true,
      });
    }
    document.addEventListener('click', this.handleBlur);

    if (this.props.data && this.props.data.length > 0) {
      this.setState({itemList: this.props.data});
      return ;
    }

    switch (this.props.type) {
      case 'phone':
        this.setState({itemList: ['mobile', 'business', 'personal']});
        break;
      case 'country':
        this.setState({itemList: data.countries});
        break;
      case 'usa_state':
        this.setState({itemList: data.americaStates});
        break;
      case 'canada_state':
        this.setState({itemList: data.canadaStates});
        break;
      default:
        break;
    }

    if (this.props.val) {
      this.setState({
        selected: this.props.val[0].toUpperCase()+this.props.val.slice(1),
        placeholderFlag: true
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleBlur);
  }

  handleBlur = (e) => {
    if (!this.refs.dropDown.contains(e.target)) {
      this.blur();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      switch (nextProps.type) {
      case 'phone':
        this.setState({itemList: ['mobile', 'business', 'personal']});
        break;
      case 'country':
        this.setState({itemList: data.countries});
        break;
      case 'usa_state':
        this.setState({itemList: data.americaStates});
        break;
      case 'canada_state':
        this.setState({itemList: data.canadaStates});
        break;
      default:
        break;
      }
    }

    if (this.props.val !== nextProps.val) {
      this.setState({
        selected: nextProps.val[0].toUpperCase()+nextProps.val.slice(1),
        placeholderFlag: true
      });
    }
  }

  blur = () => {
    if (this.state.selected.length > 0)
      this.setState({listFlag: false});
    else {
      this.setState({listFlag: false, placeholderFlag: false});
    }
  }

  render() {
    return(
      <div
        className="g-dropdown"
        ref="dropDown"
        onClick={() => {
          this.setState({
            placeholderFlag: true,
            listFlag: true,
          })}}
      >
        <span
          className={this.state.placeholderFlag ? "g-placeholder_default g-placeholder_active" :"g-placeholder_default"}>
          {this.props.placeholder}
        </span>
        <input
          className="g-dropdown__input"
          ref="dropDownInput"
          value={this.state.selected} />
        <div className="g-dropdown__triangle"/>
        <div className="g-dropdown__list"
          style={this.state.listFlag ? {display: 'block'} : {display: 'none'}}
        >
          <ul>
            {this.state.itemList.map((item, index) => <li
              onClick={() => {
                this.handleSelect(item);
              }}
              key={index}
            >
              {item[0].toUpperCase()+item.slice(1)}
            </li>)}
          </ul>
        </div>
      </div>
    );
  }
}
