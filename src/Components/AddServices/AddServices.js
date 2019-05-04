import React, {Component} from 'react';
import axios from 'axios';
import AddServicesForm from '../Form/AddServicesForm'
import ErrorBoundary from '../ErrorBoundary.js/ErrorBoundary';

class AddServices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      errorMessage: '',
      items: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async() => {
    try {
      const {data} = await axios.get('http://localhost:49567/api/service-types');
      this.setState({items: data.data});

    } catch (error) {
      this.setState({error: true, errorMessage: error.message});
    }
  }

  render() {
    if (this.state.error) {
      throw new Error(this.state.errorMessage);
    }

    return (
      <ErrorBoundary>
        <AddServicesForm data={this.state.items}/>
      </ErrorBoundary>
    )
  }
}

export default AddServices;
