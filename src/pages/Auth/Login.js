import "./Auth.css";

// components
import {Link} from 'react-router-dom';
import Message from '../../components/Message/Message';

// hooks
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';

// redux
import {login, reset} from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }
    
    dispatch(login(user));

  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo.</p>

      <form onSubmit={handleSubmit}>
        <input type="email" value={email || ""} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
        <input type="password" value={password || ""} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />

        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
      </form>

      {error && <Message msg={error} type="error"/> }

      <p>Ainda não tem uma conta? <Link to="/register">Clique aqui para criar</Link>. </p>
    </div>
  )
}

export default Login