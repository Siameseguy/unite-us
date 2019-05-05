## Coding Challeng

For this challenge, the front-end was built with React. The app has three components:

- AddServices
- AddServicesForm
- ErrorBoundary

AddServices passes down data from the API as props for the AddServicesForm.

The ErrorBoundary wraps around the AddServices component and watches for any errors in the children that bubble up. The errors that are displayed to the user are dependant on the server error number that comes back after the form is submitted.

The validations are custom (I wanted to limit the number of external libraries used), and check if any form fields are empty or un-checked.

Tests mainly consist of making mock calls to the API and making sure they are set to state.

## Libraries Used

- create-react-app
- axios
- react-bootstrap
- bootstrap
- enyzme
- enzyme-adapter-react-16
