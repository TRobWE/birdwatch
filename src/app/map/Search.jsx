import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'New Orleans, LA',
    };
    this.onChange = address => this.setState({ address });
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(event) {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        axios.post('/map', latLng)
        .then((response) => {
          console.log(response, 'search response');
          this.props.birdCatcher(response);
        })
        .catch(error => console.error(error));
        this.props.getLatLng(latLng);
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

SimpleForm.propType = {
  birdCatcher: PropTypes.func.isRequired,
};

export default SimpleForm;
