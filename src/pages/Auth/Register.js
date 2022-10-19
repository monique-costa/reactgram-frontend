import "./Auth.css";

// components
import {Link} from 'react-router-dom';
import Message from '../../components/Message/Message';

// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const user = {
    name,
    email,
    password,
    confirmPassword
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    dispatch(register(user));
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name || ""} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password || ""} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirme a senha" value={confirmPassword || ""} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
      </form>

      {error && <Message msg={error} type="error" /> }

      <p>Já tem uma conta? <Link to="/login">Clique aqui para entrar</Link>. </p>
    </div>
  )
}

export default Register