import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

class AddServices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      items: [],
      addServicesForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        selected: '',
        content: ''
      }
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

  handleSelect = (event) => {
    this.setState({
      addServicesForm: {
        selected: event.target.value
      }
    })
    console.log(this.state.addServicesForm.selected)
  }

  render() {
    const services = this
      .state
      .items
      .map(item => {
        return (
          <option key={item.id} value={item.display_name}>{item.display_name}</option>
        )
      })
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control type="firstName" placeholder="First Name"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control type="lastName" placeholder="Last Name"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control type="email" placeholder="Email Address"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlSelect">
            <Form.Control as="select" value={this.state.value} onChange={this.handleSelect}>
              <option>Select Service Type</option>
              {services}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="addServices.ControlTextarea">
            <Form.Control as="textarea" rows="3"/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default AddServices;
