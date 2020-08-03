let buildMakeUser = function(userValidator) {
  return ({
      username,
      password
    } = {}) => {
    let {error} = userValidator({username, password})
    if (error) throw new Error(error);

    return {
      getUsername: () => username,
      getPassword: () => password,
    };
  }
};
  
module.exports = buildMakeUser