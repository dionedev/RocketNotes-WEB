import { useState } from "react";
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Container, Form, BackgroundImage } from "./styles";

export function SignIn() {
  const [email, useEmail] = useState("")
  const [password, usePassword] = useState("")

  const { signIn } = useAuth()

  function handleSignIn(){
    signIn({ email, password })
  }

  return(
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>
          Aplicação para salvar e gerenciar seus links úteis.
        </p>

        <h2>Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          onChange={event => useEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => usePassword(event.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <BackgroundImage />
    </Container>
  )
}