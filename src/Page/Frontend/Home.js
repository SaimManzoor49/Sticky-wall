import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, theme } from 'antd';
import {MdKeyboardDoubleArrowRight} from 'react-icons/md'
import {BsFillMenuButtonFill,BsCalendarDay} from 'react-icons/bs'
import {AiOutlineUnorderedList,AiOutlineSearch} from 'react-icons/ai'

import List from '../../components/List'
import Upcoming from '../../components/Upcoming'
import Today from '../../components/Today'
import Calendar from '../../components/Calendar'

const { Header, Content, Footer, Sider } = Layout;


const label = ['List','Upcoming','Today','Calendar'] 

const Home = () => {
  const [componentToRender,setComponentToRender] = useState('List')
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const handleSearch = (e)=>{
console.log(e.target.value)
  }

  return (
    <Layout style={{minHeight:'100vh'}} >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <h5 className='text-white px-2 pt-4 '> Menu</h5>

        <Input className='ms-1  my-3' style={{width:'96%' , height:'36px' }} type='text' placeholder="Search" onChange={(e)=>{handleSearch(e)}} prefix={<AiOutlineSearch />} />

        <h6 className='text-white'>Tasks</h6>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[AiOutlineUnorderedList, BsFillMenuButtonFill, MdKeyboardDoubleArrowRight , BsCalendarDay].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: label[index],
              onClick: () => {
                setComponentToRender(label[index])
              },
            }),
          )}
        />
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
        <Content
          >
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
            }}
          >
            
            {componentToRender==='List'&& <List />}
            {componentToRender==='Upcoming'&& <Upcoming />}
            {componentToRender==='Today'&& <Today />}
            {componentToRender==='Calendar'&& <Calendar />}


          </div>
        </Content>
       
      </Layout>
    </Layout>
  );
};
export default Home;