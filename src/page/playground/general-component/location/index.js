import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions} from 'mdbreact';
import {languageHelper} from '../../../../tool/language-helper';
import {get} from '../../../../tool/api-helper';

class LocationReact extends React.Component {
  constructor(props) {
    super(props);
    // i18n
    this.text = LocationReact.i18n[languageHelper()];
    // state
    this.state = {
      render: 0,
      code: props.code,
      display: '',
      country: {
        countrySelectedIndex: 0,
        countryList: [
          {
            id: 'CHN',
            name: this.text.china
          },
          {
            id: 'USA',
            name: this.text.usa
          },
          {
            id: 'OTH',
            name: this.text.other
          }
        ],
      },
      china: {
        provinceSelectedIndex: 0,
        provinceList: [],
        citySelectedIndex: 0,
        cityList: [],
        districtSelectedIndex: 0,
        districtList: []
      }
    };
    // constant
    this.unknownId = '000000';
    this.defaultProvinceId = '110000'; // 北京市
    // function
    this.addUnknownItem = this.addUnknownItem.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.localChinaCodeToDisplay = this.localChinaCodeToDisplay.bind(this);
    this.ready = this.ready.bind(this);
  }

  static setSelected(id, list) {
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        list[i].selected = true;
        index = i;
      } else {
        list[i].selected = false;
      }
    }
    return index;
  }

  static idToindex(id, list) {
    for (let i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        return i;
      }
    }
    return 0;
  }

  addUnknownItem(list) {
    list.push({
      id: this.unknownId,
      name: this.text.unselected
    });
  }

  localChinaCodeToDisplay(prevState) {
    return `${prevState.country.countryList[prevState.country.countrySelectedIndex].name} ${prevState.china.provinceList[prevState.china.provinceSelectedIndex].name} ${prevState.china.cityList[prevState.china.citySelectedIndex].name} ${prevState.china.districtList[prevState.china.districtSelectedIndex].name}`
      .replace(new RegExp(` ${this.text.unselected}`, 'g'), '');
  }

  getLocation() {
    return {
      code: this.state.code,
      display: this.state.display
    };
  }

  ready() {
    if (typeof (this.props.update) === 'function') {
      this.props.update(this.getLocation());
    }
  }

  handleCountryChange(data) {
    const selectedId = data[0];
    if (selectedId === this.state.country.countryList[this.state.country.countrySelectedIndex].id) {
      return;
    }
    if (selectedId === 'CHN') {
      // CHN
      get('/static/location?target=1&id=000000').then((data) => {
        if (!data.status.code.toString().startsWith('2')) {
          throw data;
        }
        // Step 1
        //
        // province
        let provinceList = [];
        Array.prototype.push.apply(provinceList, data.content);
        let provinceSelectedIndex = LocationReact.setSelected(this.defaultProvinceId, provinceList);
        // city
        let cityList = [];
        this.addUnknownItem(cityList);
        let citySelectedIndex = LocationReact.setSelected(this.unknownId, cityList);
        // district
        let districtList = [];
        this.addUnknownItem(districtList);
        let districtSelectedIndex = LocationReact.setSelected(this.unknownId, districtList);
        //
        this.setState((prevState) => {
          return {
            country: Object.assign({}, prevState.country, {
              countrySelectedIndex: Location.idToindex(selectedId, prevState.country.countryList)
            }),
            china: Object.assign({}, prevState.china, {
              provinceList: provinceList,
              provinceSelectedIndex: provinceSelectedIndex,
              cityList: cityList,
              citySelectedIndex: citySelectedIndex,
              districtList: districtList,
              districtSelectedIndex: districtSelectedIndex
            })
          };
        });
        // Step 2
        this.handleProvinceChange([this.defaultProvinceId], true);
      });
      // clean
      this.setState({
        china: null
      });
    } else {
      // USA OTH
      //
      // READY
      this.setState((prevState) => {
        return {
          country: Object.assign({}, prevState.country, {
            countrySelectedIndex: Location.idToindex(selectedId, prevState.country.countryList)
          }),
          china: null
        };
      });
      this.setState({
        code: selectedId === 'USA' ? '900000' : '999999',
      });
      this.setState((prevState) => {
        return {
          display: prevState.country.countryList[prevState.country.countrySelectedIndex].name
        };
      }, this.ready);
    }
  }

  handleProvinceChange(data, force = false) {
    const selectedId = data[0];
    if (!force && selectedId === this.state.china.provinceList[this.state.china.provinceSelectedIndex].id) {
      return;
    }
    get(`/static/location?target=2&id=${selectedId}`).then((data) => {
      if (!data.status.code.toString().startsWith('2')) {
        throw data;
      }
      // city
      let cityList = [];
      this.addUnknownItem(cityList);
      Array.prototype.push.apply(cityList, data.content);
      let citySelectedIndex = LocationReact.setSelected(this.unknownId, cityList);
      // district
      let districtList = [];
      this.addUnknownItem(districtList);
      let districtSelectedIndex = LocationReact.setSelected(this.unknownId, districtList);
      // READY
      this.setState((prevState) => {
        return {
          china: Object.assign({}, prevState.china, {
            cityList: cityList,
            citySelectedIndex: citySelectedIndex,
            districtList: districtList,
            districtSelectedIndex: districtSelectedIndex
          })
        };
      });
      this.setState((prevState) => {
        return {
          code: selectedId === this.unknownId ? prevState.china.cityList[prevState.china.citySelectedIndex].id : selectedId
        };
      });
      this.setState((prevState) => {
        return {
          display: this.localChinaCodeToDisplay(prevState)
        };
      }, this.ready);
    });
    // clean
    this.setState((prevState) => {
      return {
        china: Object.assign({}, prevState.china, {
          provinceSelectedIndex: Location.idToindex(selectedId, prevState.china.provinceList),
          cityList: null,
          citySelectedIndex: 0,
          districtList: null,
          districtSelectedIndex: 0
        })
      };
    });
  }

  handleCityChange(data) {
    const selectedId = data[0];
    if (selectedId === this.state.china.cityList[this.state.china.citySelectedIndex].id) {
      return;
    }
    get(`/static/location?target=3&id=${selectedId}`).then((data) => {
      if (!data.status.code.toString().startsWith('2')) {
        throw data;
      }
      // district
      let districtList = [];
      this.addUnknownItem(districtList);
      Array.prototype.push.apply(districtList, data.content);
      let districtSelectedIndex = LocationReact.setSelected(this.unknownId, districtList);
      // READY
      this.setState((prevState) => {
        return {
          china: Object.assign({}, prevState.china, {
            districtList: districtList,
            districtSelectedIndex: districtSelectedIndex
          })
        };
      });
      this.setState((prevState) => {
        return {
          code: selectedId === this.unknownId ? prevState.china.cityList[prevState.china.citySelectedIndex].id : selectedId
        };
      });
      this.setState((prevState) => {
        return {
          display: this.localChinaCodeToDisplay(prevState)
        };
      }, this.ready);
    });
    // clean
    this.setState((prevState) => {
      return {
        china: Object.assign({}, prevState.china, {
          citySelectedIndex: Location.idToindex(selectedId, prevState.china.cityList),
          districtList: null,
          districtSelectedIndex: 0
        })
      };
    });
  }

  handleDistrictChange(data) {
    const selectedId = data[0];
    if (selectedId === this.state.china.districtList[this.state.china.districtSelectedIndex].id) {
      return;
    }
    // READY
    this.setState((prevState) => {
      return {
        china: Object.assign({}, prevState.china, {
          districtSelectedIndex: Location.idToindex(selectedId, prevState.china.districtList)
        })
      };
    });
    this.setState((prevState) => {
      return {
        code: selectedId === this.unknownId ? prevState.china.cityList[prevState.china.citySelectedIndex].id : selectedId
      };
    });
    this.setState((prevState) => {
      return {
        display: this.localChinaCodeToDisplay(prevState)
      };
    }, this.ready);
  }

  componentDidMount() {
    let country = this.state.country;
    if (this.state.code === '999999') {
      // OTH
      country.countrySelectedIndex = LocationReact.setSelected('OTH', country.countryList);
      this.setState({
        render: 1,
        display: this.text.other,
        country: country,
        china: null
      }, this.ready);
    } else if (this.state.code === '900000') {
      // USA
      country.countrySelectedIndex = LocationReact.setSelected('USA', country.countryList);
      this.setState({
        render: 1,
        display: this.text.usa,
        country: country,
        china: null
      }, this.ready);
    } else {
      // CHN
      country.countrySelectedIndex = LocationReact.setSelected('CHN', country.countryList);
      let china = this.state.china;
      let provinceId = `${this.state.code.substring(0, 2)}0000`;
      let cityId = `${this.state.code.substring(0, 4)}00`;
      let districtId = this.state.code;
      Promise.all([
        get('/static/location?target=1&id=000000'),
        get(`/static/location?target=2&id=${provinceId}`),
        get(`/static/location?target=3&id=${cityId}`)
      ]).then((values) => {
        for (let i = 0; i < values.length; i++) {
          if (!values[i].status.code.toString().startsWith('2')) {
            throw values[i];
          }
        }
        // province
        Array.prototype.push.apply(china.provinceList, values[0].content);
        china.provinceSelectedIndex = LocationReact.setSelected(provinceId, china.provinceList);
        // city
        this.addUnknownItem(china.cityList);
        Array.prototype.push.apply(china.cityList, values[1].content);
        china.citySelectedIndex = LocationReact.setSelected(cityId, china.cityList);
        // district
        this.addUnknownItem(china.districtList);
        Array.prototype.push.apply(china.districtList, values[2].content);
        china.districtSelectedIndex = LocationReact.setSelected(districtId, china.districtList);
        //
        this.setState({
          render: 1,
          display: `${country.countryList[country.countrySelectedIndex].name} ${china.provinceList[china.provinceSelectedIndex].name} ${china.cityList[china.citySelectedIndex].name} ${china.districtList[china.districtSelectedIndex].name}`
            .replace(new RegExp(` ${this.text.unselected}`, 'g'), ''),
          country: country,
          china: china
        }, this.ready);
      });
    }
  }

  render() {
    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return this.props.update ? (
          <div>
            {/* edit */}
            <MDBSelect
              getValue={this.handleCountryChange}
            >
              <MDBSelectInput selected="" />
              <MDBSelectOptions>
                {
                  this.state.country.countryList.map((item, index) => {
                    return (
                      <MDBSelectOption
                        key={index}
                        checked={item.selected}
                        value={item.id}
                      >
                        {item.name}
                      </MDBSelectOption>
                    );
                  })
                }
              </MDBSelectOptions>
            </MDBSelect>
            {
              this.state.china ? (
                <div>
                  <MDBSelect
                    getValue={this.handleProvinceChange}
                  >
                    <MDBSelectInput selected="" />
                    <MDBSelectOptions>
                      {
                        this.state.china.provinceList.map((item, index) => {
                          return (
                            <MDBSelectOption
                              key={index}
                              checked={item.selected}
                              value={item.id}
                            >
                              {item.name}
                            </MDBSelectOption>
                          );
                        })
                      }
                    </MDBSelectOptions>
                  </MDBSelect>
                  {
                    this.state.china.cityList ? (
                      <MDBSelect
                        getValue={this.handleCityChange}
                      >
                        <MDBSelectInput selected="" />
                        <MDBSelectOptions>
                          {
                            this.state.china.cityList.map((item, index) => {
                              return (
                                <MDBSelectOption
                                  key={index}
                                  checked={item.selected}
                                  value={item.id}
                                >
                                  {item.name}
                                </MDBSelectOption>
                              );
                            })
                          }
                        </MDBSelectOptions>
                      </MDBSelect>
                    ) : null
                  }
                  {
                    this.state.china.districtList ? (
                      <MDBSelect
                        getValue={this.handleDistrictChange}
                      >
                        <MDBSelectInput selected="" />
                        <MDBSelectOptions>
                          {
                            this.state.china.districtList.map((item, index) => {
                              return (
                                <MDBSelectOption
                                  key={index}
                                  checked={item.selected}
                                  value={item.id}
                                >
                                  {item.name}
                                </MDBSelectOption>
                              );
                            })
                          }
                        </MDBSelectOptions>
                      </MDBSelect>
                    ) : null
                  }
                </div>
              ) : null
            }
          </div>
        ) : (
          <div>
            {/* display */}
            <span>{this.state.display}</span>
          </div>
        );
      default:
        return null;
    }
  }
}

LocationReact.i18n = [
  {
    china: '中国',
    usa: '美国',
    other: '其他',
    unselected: '未知'
  },
  {
    china: 'China',
    usa: 'United States',
    other: 'Other',
    unselected: 'Unknown'
  }
];

LocationReact.propTypes = {
  // self
  code: PropTypes.string.isRequired,
  update: PropTypes.func,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Location = withRouter(LocationReact);
