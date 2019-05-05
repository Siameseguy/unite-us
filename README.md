## Coding Challeng

For this challenge, the front-end was built with React. The app has three components:

- AddServices
- AddServicesForm
- ErrorBoundary

AddServices is used to retrieve information from the API and passes the response down to AddServicesForm as props.

AddServices from takes the props passed down from AddServices and renders a form with the data.

The ErrorBoundary wraps around the AddServices component and watches for any errors in the children that bubble up. The errors that are displayed to the user are dependant on the server error number that comes back after the form is submitted.

The validations are custom (I wanted to limit the number of external libraries used), and check if any form fields are empty or un-checked.

Tests mainly consist of making mock calls to the API and making sure they are set to state.

## Issues

When the form is submitted and if there is a server error, the red overlay appears because of the Errorboundary component. After doing research I found that this error only occurs in development and not in production. To get rid of the overlay, just click on the 'x' in the top right corner to see result of the error.

## Libraries Used

- create-react-app
- axios
- react-bootstrap
- bootstrap
- enyzme
- enzyme-adapter-react-16
