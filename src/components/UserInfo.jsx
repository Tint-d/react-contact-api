import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import React from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { BsPinMap } from "react-icons/bs";

const UserInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data } = useGetSingleContactQuery({ id, token });
  const photo = data?.contact?.photo;
  console.log(data);
  return (
    <Container className="flex justify-center items-center h-screen">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-72">
        <img
          src={
            photo
              ? photo
              : "https://i.pinimg.com/474x/6c/74/25/6c74255c82ac875ba9321bb44757407f.jpg"
          }
          className="w-44 mx-auto"
        />
        <Text size={"lg"} className="font-bold my-5">
          {data?.contact?.name}
        </Text>
        <div className="flex items-center gap-2 my-5">
          <AiOutlinePhone className="text-xl" />
          <p>{data?.contact?.phone}</p>
        </div>
        <div className="flex items-center gap-2 my-5">
          <AiOutlineMail className="text-xl" />
          <p>{data?.contact?.email}</p>
        </div>
        <div className="flex items-center gap-2 my-5">
          <BsPinMap className="text-xl" />
          <p>{data?.contact?.address}</p>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm">
            Go Home
          </Button>
        </Link>
      </Card>
    </Container>
  );
};

export default UserInfo;
