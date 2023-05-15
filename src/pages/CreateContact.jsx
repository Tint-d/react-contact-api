import React, { useState } from "react";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { BsPinMap } from "react-icons/bs";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const [createContact] = useCreateContactMutation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
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
        Create New Contact
      </Title>

      <Text className="text-sm text-red-500 text-center" mt="md">
        {error?.phone}
      </Text>
      <Text className="text-sm text-red-500 text-center" mt="md">
        {error?.email}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            const contactData = await createContact({ token, data: values });
            console.log(contactData);
            if (contactData?.error) {
              setError(contactData?.error?.data?.errors);
            }
            if(contactData?.data?.success) navigate("/")
          })}
        >
          <TextInput
            icon={<RxPerson />}
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
            required
          />
          <TextInput
            label="Email"
            icon={<AiOutlineMail />}
            placeholder="you@mantine.dev"
            mt="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Phone"
            icon={<AiOutlinePhone />}
            placeholder="Enter your phone number"
            mt="md"
            {...form.getInputProps("phone")}
            // required
          />
          <TextInput
            label="Address"
            icon={<BsPinMap />}
            placeholder="Enter your address"
            mt="md"
            {...form.getInputProps("address")}
          />
          <Button type="submit" variant="outline" fullWidth mt="xl">
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateContact;
