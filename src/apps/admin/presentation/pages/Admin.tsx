import { useState } from "react";
import Header from "../../../../components/Header";
import Users from "../components/Users";
import Dash from "../components/Dash";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Users");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Users":
        return <Users />;
      case "Dash":
        return <Dash />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full h-screen">
        <div className="flex flex-col justify-center w-1/12 bg-primary bg-opacity-10 shadow-xl">
          <button className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4" onClick={() => setActiveComponent('Users')}>
            Users
          </button>
          <button className="flex justify-center mb-2 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4" onClick={() => setActiveComponent('Dash')}>
            Products
          </button>
          <button className="flex justify-center mb-96 font-roboto text-primary focus:underline focus:decoration-primary focus:decoration-2 focus:underline-offset-4">
            Sales
          </button>
        </div>
        <div className="flex w-11/12">{renderComponent()}</div>
      </div>
    </>
  );
};

export default Admin;
