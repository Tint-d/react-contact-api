import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useFormik } from "formik";
import { useLoginAccountMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
  const navigate = useNavigate();
  const [loginAccount, { isLoading }] = useLoginAccountMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { data } = await loginAccount(values);
      // console.log(data);
      if (data?.success) {
        dispatch(addUser(data));
        navigate("/");
      }
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Link to="/register">
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Link>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email"
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          {/* <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Link to="/forgot">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group> */}
          <Button
            type="submit"
            fullWidth
            variant="outline"
            mt="xl"
            disabled={isLoading && true}
          >
            {isLoading ? <ImSpinner9 className="animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
