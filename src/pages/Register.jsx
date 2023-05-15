import React from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useRegisterAccountMutation } from "../redux/api/authApi";
import { ImSpinner9 } from "react-icons/im";

const Register = () => {
  const [registeAccount, { isLoading }] = useRegisterAccountMutation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?
        <Link to={"/login"}>
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { data } = await registeAccount(values);
            console.log(data);
            if (data?.success) navigate("/login");
          })}
        >
          <TextInput
            label="Name"
            placeholder="John Doe"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            mt="md"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Enter password"
            required
            mt="md"
            {...form.getInputProps("password_confirmation")}
          />
          <Button
            type="submit"
            variant="outline"
            fullWidth
            mt="xl"
            disabled={isLoading && true}
          >
            {isLoading ? <ImSpinner9 className="animate-spin" /> : "Create"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
