import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  useChangePasswordMutation,
  useLogoutAccountMutation,
} from "../redux/api/authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/features/authSlice";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ForgotPassword() {
  const [chagnePassword] = useChangePasswordMutation();
  const [logoutAccount] = useLogoutAccountMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { classes } = useStyles();
  const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // const chagnePasswordHandler = async (values, token) => {
  //   const data = await chagnePassword({ values, token });

  //   console.log(data);
  //   // if (data?.success) {
  //   //   await logoutAccount(token);
  //   //   dispatch(removeUser());
  //   //   navigate("/login");
  //   // }
  // };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Change your password?
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { data } = await chagnePassword({ values, token });
            console.log(data);
            if (data?.success) {
              await logoutAccount(token);
              dispatch(removeUser());
              navigate("/login");
            }
          })}
        >
          <PasswordInput
            label="Enter old password"
            placeholder="*******"
            mt="md"
            required
            {...form.getInputProps("current_password")}
          />
          <PasswordInput
            label="Enter new password"
            placeholder="*******"
            mt="md"
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="*******"
            mt="md"
            required
            {...form.getInputProps("password_confirmation")}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Link to="/">
              <Anchor color="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <FiArrowLeft />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
            </Link>
            <Button type="submit" variant="outline" className={classes.control}>
              Change password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
