import React from "react";
import { Layout, Breadcrumb, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Header className="bg-blue-900 text-white" style={{ padding: '0 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-lg leading-16">KULLANICI İŞLEMLERİ</div>
      </Header>
      <Content style={{ margin: "16px", width: "100%" }}>
        <div className="p-6 min-h-[calc(100vh-160px)] bg-white">
          {children}
        </div>
      </Content>
      <Footer className="text-center">©2024 Tüm Hakları Saklıdır</Footer>
    </Layout>
  );
};

export default AppLayout;
