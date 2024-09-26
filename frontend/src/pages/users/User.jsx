import React, { useEffect, useState } from "react";
import { Button, Space, Popconfirm, notification, Breadcrumb } from "antd";
import { UserAPI } from "../../services/UserAPI";
import MyTable from "../../components/MyTable";
import { Link, useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate(); 
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const handleSearch = (value) => {
      setSearchText(value);
      setPage(1); 
    };
    
    const handleDelete = async (id) => {
      try {
        setLoading(true)
        await UserAPI.delete(id);
        notification.success({
          message: "Başarılı",
          description: "Kullanıcı başarıyla silindi.",
          placement: "topRight",
        });
        setLoading(false)
        setPage(1);
      } catch (err) {
        notification.error({
          message: "Hata!",
          description: "Kullanıcı silinirken bir hata oluştu.",
        });
        console.error(err);
      }
    };
  
    const columns = [
      { title: "İsim", dataIndex: "name", key: "name" },
      { title: "Yaş", dataIndex: "age", key: "age" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Telefon", dataIndex: "phone", key: "phone" },
      { title: "Ülke", dataIndex: "country", key: "country" },
      { title: "İlçe", dataIndex: "district", key: "district" },
      { title: "Rol", dataIndex: "role", key: "role" },
      {
        title: "Aksiyonlar",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={()=> navigate(`/user-edit/${record.id}`)} type="primary">Güncelle</Button>
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" danger>Sil</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  
    const fetchUsers = async (page, filters) => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          page: page,
          pageSize: 5,
        });
        if (filters.trim() !== "") {
          params.append("filter", filters);
        }
        const response = await UserAPI.getAll(params);
        setData(response.users);
        setTotalData(response.total);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchUsers(page, searchText);
    }, [page, searchText]);
  return (
    <div>
      <MyTable
      columns={columns}
      data={data}
      totalData={totalData}
      page={page}
      setPage={setPage}
      loading={loading}
      handleSearch={handleSearch}
      navigate={navigate}
      />
    </div>
  )
}

export default User
