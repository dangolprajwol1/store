const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = [username, password];
    const data = dispatch(UserLogin(credentials));
    console.log(data);
  };
  return <> // login form goes here .. onSubmit = {handleSubmit} </>;
};

export default Login;
