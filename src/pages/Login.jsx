import React from 'react'
import styled from 'styled-components'
import Logo from '../ui/Logo';
import LoginForm from '../features/authentication/LoginForm';


const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function Login() {
  return (
    <LoginLayout>
      <Logo/>
      <LoginForm/>
      </LoginLayout>
  )
}
