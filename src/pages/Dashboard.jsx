import React, { useState } from "react";

import Header from "../components/Header";
import { Container } from "@mantine/core";
import contact from "../assets/contact.gif";
import ContactTable from "../components/ContactTable";
const Dashboard = () => {
  return (
    <Container>
      <Header />
      <ContactTable />
    </Container>
  );
};

export default Dashboard;

{
  /* <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={contact} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Contact</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div> */
}
