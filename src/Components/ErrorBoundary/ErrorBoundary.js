import React from 'react';
import Button from 'react-bootstrap/Button';

import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
      errorNumber: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true, error, info, errorNumber: error.message});
  }

  switchCases(params) {
    switch (params) {
      case '401':
        return <ErrorMessage message={'Sorry, you are not authorized to make this request.'}/>

      case '500':
        return <ErrorMessage message={'Oh no! Something completely unexpected happened!'}/>;
      case '503':
        return <ErrorMessage message={'We\'re down!!!!!! Come back later.....(please).'}/>;
      default:
        return <ErrorMessage message={'Oh snap! Something went wrong!'}/>;
    }

  }

  resetError = () => {
    this.setState({hasError: false, error: null, info: null})
  }

  render() {
    if (this.state.info) {
      return (
        <div className="container">
          <div className="title">
            {this.switchCases(this.state.errorNumber)}
            <Button variant="success" onClick={this.resetError}>Try Again</Button>
          </div>
        </div>
      )

    }

    return this.props.children;
  }
}

export default ErrorBoundary;