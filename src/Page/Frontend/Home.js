import React, { useState } from "react";
import{TbLogout} from 'react-icons/tb'
import { Input, Layout, Menu, theme } from "antd";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsFillMenuButtonFill, BsCalendarDay } from "react-icons/bs";
import { AiOutlineUnorderedList, AiOutlineSearch } from "react-icons/ai";

import List from "../../components/List";
import Upcoming from "../../components/Upcoming";
import Today from "../../components/Today";
import Calendar from "../../components/Calendar";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchList from "../../components/shared/SearchList";

const { Header, Content,  Sider } = Layout;

const label = ["List", "Upcoming", "Today", "Calendar"];

const Home = () => {
  const [componentToRender, setComponentToRender] = useState("List");
  const [search, setSearch] = useState("");

  const { setUser } = useAuth();
  const navigator = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (e) => {
    setSearch(e.target.value);

  };



  const handleSignout = () => {
    signOut(auth);
    setUser({});
    navigator("/auth/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
      
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div
          className="d-flex flex-column justify-content-between "
          style={{ minHeight: "100%" }}
        >
          <div className="">
            <div className="demo-logo-vertical" />
            <h5 className="text-white px-2 pt-4 "> Menu</h5>

            <Input
              className="ms-1  my-3"
              style={{ width: "96%", height: "36px" }}
              type="text"
              placeholder="Search"
              onChange={(e) => {
                handleChange(e);
              }}
              prefix={<AiOutlineSearch />}
            />

            <h6 className="text-white">Tasks</h6>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                AiOutlineUnorderedList,
                BsFillMenuButtonFill,
                MdKeyboardDoubleArrowRight,
                BsCalendarDay,
              ].map((icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: label[index],
                onClick: () => {
                  setComponentToRender(label[index]);
                },
              }))}
            />
          </div>
         
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <h1 className="px-3 py-2">Sticky Wall</h1>
        </Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <button
            className="btn btn-danger d-flex justify-content-between rounded-0 position-fixed top-0 end-0  "
            style={{width:'140px',zIndex:'10'}}
            onClick={handleSignout}
          >
            Signout
            <TbLogout size={'25px'} />
          </button>


          {search.length ? <SearchList searchString={search} />:<>
            {componentToRender === "List" && <List />}
            {componentToRender === "Upcoming" && <Upcoming />}
            {componentToRender === "Today" && <Today />}
            {componentToRender === "Calendar" && <Calendar />}
            </> }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
