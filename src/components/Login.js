import LoginForm from './LoginForm';

function Login(props) {
  return <LoginForm title="Вход" submitBtnText="Войти" onSubmit={onLogin} />;
}

export default Login;