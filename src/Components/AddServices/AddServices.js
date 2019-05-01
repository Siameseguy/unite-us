import React, {Component} from 'react';
import axios from 'axios';

class AddServices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      items: []
    }
  }

  // async componentDidMount() {   try {     const response = await
  // fetch('http://localhost:49567/api/service-types');     const json = await
  // response.json();     this.setState({items: json});   } catch (error) {
  // this.setState({error: 'this is an error'});   } }

  componentDidMount() {
    axios
      .get('http://localhost:49567/api/service-types')
      .then(res => this.setState({items: res.data.data}))
      .catch(error => {
        console.log(error);
      })

  }

  render() {
    console.log(this.state.items)
    return (
      <div className="container">
        {this.state.items && this
          .state
          .items
          .map(item => (
            <p key={item.id}>{item.display_name}</p>
          ))}
      </div>
    )
  }
}

export default AddServices;
