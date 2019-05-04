const functions = {
  add: (num1, num2) => num1 + num2,
  createUser: () => {
    const user = {
      firstName: 'Nousit',
      lastName: 'Syhakhom'
    }

    return user;
  }
};

module.exports = functions;