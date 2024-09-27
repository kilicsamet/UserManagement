import React from "react";
import { Table, Row, Col, Card, Breadcrumb, Pagination } from "antd";
import LoaderReport from "./LoaderReport";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Search from "./Search";

const MyTable = (props) => {
  return (
    <Row style={{ height: "80%" }}>
      <Col span={24}>
        <Card style={{ margin: "16px 0" }}>
          <Row justify="end">
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Ana Sayfa</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Kullanıcı Listesi</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Card>
      </Col>
      <Filter
        filterData={props.filterData}
        handleChange={props.handleChange}
        handleClearFilter={props.handleClearFilter}
        handleFilter={props.handleFilter}
      />

      {props.loading ? (
        <Col
          span={20}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LoaderReport />
        </Col>
      ) : (
        <Col span={20}>
          <Card>
            <Search
              searchText={props.searchText}
              handleSearch={props.handleSearch}
              navigate={props.navigate}
            />
           {
            props.data.length>0
            ?
            <>
            <div>
              <Table
                columns={props.columns}
                dataSource={props.data}
                pagination={false}
                rowKey="id"
                style={{ minHeight: "400px" }}
              />
            </div>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <Pagination
                pageSize={5}
                total={props.totalData}
                current={props.page}
                onChange={(page) => props.setPage(page)}
                style={{ padding: "8px", float: "right" }}
              />
            </div>
          </>
            :
            <div style={{ textAlign: "center", margin: "215px"  }}>
            <p>Aradığınız kriterlere uygun kullanıcı bulunamadı.</p>
          </div>
           }
         
          </Card>
        </Col>
      )}
    </Row>
  );
};
export default MyTable;
