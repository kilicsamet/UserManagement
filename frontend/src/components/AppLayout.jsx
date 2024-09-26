import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Layout>
        <Header className="header">
          <div style={{color:"white"}}>KULLANICI İŞLEMLERİ</div>
        </Header>
        <Content style={{ margin: "0px" }}>
          <div style={{ padding: 24, minHeight: 500, background: '#fff' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
