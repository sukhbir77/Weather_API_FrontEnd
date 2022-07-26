import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hook";
import { useMutation } from "@apollo/react-hooks";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>This is the register page, Register below to create an account</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} type="password" />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          onChange={onChange}
          type="password"
        />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button style={{marginTop: 10}} variant="contained" onClick={onSubmit}>Register</Button>
    </Container>
  );
}

export default Register;
