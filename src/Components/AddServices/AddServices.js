import React, {Component} from 'react';
import axios from 'axios';
import AddServicesForm from '../Form/AddServicesForm'
import ErrorBoundary from '../ErrorBoundary.js/ErrorBoundary';

class AddServices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      items: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:49567/api/service-types');
      this.setState({items: response.data.data});
    } catch (error) {
      this.setState({error: 'this is an error'});
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <AddServicesForm data={this.state.items}/>
      </ErrorBoundary>
    )
  }
}

export default AddServices;
