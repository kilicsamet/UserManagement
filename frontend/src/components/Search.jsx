import React from 'react'
import {
    Button,
    Input
  } from "antd";
const Search = (props) => {
  return (
    <div
    style={{
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Input.Search
      placeholder="Arama yapın"
      defaultValue={props.searchText}
      onSearch={props.handleSearch}
      size="large"
      style={{
        marginRight: 16,
        width: "100%",
        minHeight: "40px",
        fontSize: "28px",
        padding: "10px 20px",
      }}
      enterButton
    />

    <Button
      type="primary"
      style={{
        backgroundColor: "green",
        borderColor: "green",
        minHeight: "40px",
        fontSize: "18px", 
        padding: "10px 20px", 
      }}
      onClick={() => props.navigate(`/user-add`)}
    >
      Kullanıcı Ekle
    </Button>
  </div>
  )
}

export default Search
