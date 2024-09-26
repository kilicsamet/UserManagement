import React from "react";
import { Table, Button, Input  } from "antd";
import LoaderReport from "./LoaderReport";

const MyTable = (props) => {


  return props.loading ? (
    <LoaderReport />
  ) : (
    <div>
       <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
  <Input.Search
    placeholder="Arama yapın"
    defaultValue={props.searchText}
    onSearch={props.handleSearch}
    style={{ marginRight: 16 }}
  />
  <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} 
  onClick={()=> props.navigate(`/user-add`)}
  >
    Kullanıcı Ekle
  </Button>
</div>
      <Table
        columns={props.columns}
        dataSource={props.data}
        pagination={{
          pageSize: 5,
          total: props.totalData,
          current: props.page,
          onChange: (page) => props.setPage(page),
        }}
      />
    </div>
  );
};

export default MyTable;
