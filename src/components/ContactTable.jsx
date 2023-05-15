import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useGetContactsQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import { ImSpinner9 } from "react-icons/im";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../redux/features/contactSlice";
import { Link } from "react-router-dom";

const ContactTable = () => {
  const token = Cookies.get("token");
  const contacts = useSelector((state) => state.contact.contacts);
  const searchTerm = useSelector((state) => state.contact.searchTerm);
  const [activePage, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetContactsQuery({
    token,
    page: activePage,
  });
  console.log(data);
  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);
  const nextHandler = () => {
    if (data?.contacts?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };
  const prevHandler = () => {
    if (data?.contacts?.prev_page_url) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1 className="text-center mt-10">Loading ...</h1>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <Button.Group my="xl">
              <Button
                variant="default"
                onClick={prevHandler}
                disabled={isFetching && true}
              >
                <RiArrowDropLeftFill />
              </Button>
              <Button variant="default">
                {isFetching ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  activePage
                )}
              </Button>
              <Button
                variant="default"
                onClick={nextHandler}
                disabled={isFetching && true}
              >
                <RiArrowDropRightFill />
              </Button>
            </Button.Group>
            <Link to="/create">
              <Button variant="outline">Create New Contact</Button>
            </Link>
          </div>
          <Table verticalSpacing="md" fontSize="xs">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts
                ?.filter((contact) => {
                  if (searchTerm === "") {
                    return contact;
                  } else if (
                    contact?.name
                      .toLowerCase()
                      .includes(searchTerm?.toLocaleLowerCase())
                  ) {
                    return contact;
                  }
                })
                ?.map((item) => (
                  <tr key={item?.id}>
                    <th>
                      <img
                        src="https://i.pinimg.com/474x/69/bb/0e/69bb0ec11e240e166a968e0635462a2c.jpg"
                        alt=""
                        className="w-10"
                      />
                    </th>
                    <th>{item.name}</th>
                    <th>{item.phone}</th>
                    <th>
                      <Actions id={item?.id} />
                    </th>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button.Group my="xl">
            <Button
              variant="default"
              onClick={prevHandler}
              disabled={isFetching && true}
            >
              <RiArrowDropLeftFill />
            </Button>
            <Button variant="default">
              {isFetching ? (
                <ImSpinner9 className="animate-spin" />
              ) : (
                activePage
              )}
            </Button>
            <Button
              variant="default"
              onClick={nextHandler}
              disabled={isFetching && true}
            >
              <RiArrowDropRightFill />
            </Button>
          </Button.Group>
        </>
      )}
    </>
  );
};

export default ContactTable;
