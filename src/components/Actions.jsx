import { Menu, Button, Text } from "@mantine/core";
import { IoMdPerson } from "react-icons/io";
import { VscEdit } from "react-icons/vsc";
import { TiTrash } from "react-icons/ti";
import { useState } from "react";
import UserInfo from "./UserInfo";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDeleteContactMutation } from "../redux/api/contactApi";
import Swal from "sweetalert2";

function Actions({ id }) {
  const token = Cookies.get("token");
  const [deleteContact] = useDeleteContactMutation();
  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteContact({ token, id });
      }
    });
  };
  return (
    <>
      <Menu shadow="md" width={200}>
        <div className="relative">
          <Menu.Target>
            <Button variant="outline">...</Button>
          </Menu.Target>
        </div>
        <Menu.Dropdown>
          <Link to={`/info/${id}`}>
            <Menu.Item
              icon={<IoMdPerson size={14} />}
              className="text-gray-500 font-thin"
            >
              User Information
            </Menu.Item>
          </Link>
          <Menu.Item
            icon={<VscEdit size={14} />}
            className="text-gray-500 font-thin"
          >
            Edit Information
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item
            color="red"
            icon={<TiTrash size={14} />}
            onClick={() => deleteHandler()}
          >
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default Actions;
