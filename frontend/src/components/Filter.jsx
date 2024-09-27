import React from "react";
import {
  Button,
  Input,
  Select,
  Row,
  Col,
  Card
} from "antd";

const Filter = (props) => {
  return (
    <Col span={4} style={{ paddingRight: 16 }}>
    <Card title="Filtreleme" bordered={false} style={{ minHeight: "560px" }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Ülke</label>
        <Input
          placeholder="Ülke"
          value={props.filterData.country || ''} 
          onChange={(e) => props.handleChange('country', e.target.value)}
          style={{ width: "100%", marginBottom: 16 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Şehir</label>
        <Input
          placeholder="Şehir"
          value={props.filterData.city || ''} 
          onChange={(e) => props.handleChange('city', e.target.value)}
          style={{ width: "100%", marginBottom: 16 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Rol</label>
        <Select
          placeholder="Rol Seçin"
          value={props.filterData.role || undefined} 
          onChange={(value) => props.handleChange('role', value)}
          style={{ width: "100%", marginBottom: 16 }}
        >
          <Select.Option value="user">Kullanıcı</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </div>
  
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <label style={{ display: "block", marginBottom: 8 }}>Yaş (min)</label>
          <Input
            type="number"
            placeholder="Minimum Yaş"
            min="0"
            value={props.filterData.minAge || ''} 
            onChange={(e) => props.handleChange('minAge', Math.max(0, e.target.value))}
            style={{ width: "100%", marginBottom: 16 }}
          />
        </Col>
        <Col span={12}>
          <label style={{ display: "block", marginBottom: 8 }}>Yaş (max)</label>
          <Input
            type="number"
            placeholder="Maksimum Yaş"
            min="0"
            value={props.filterData.maxAge || ''}
            onChange={(e) => props.handleChange('maxAge', Math.max(0, e.target.value))}
            style={{ width: "100%", marginBottom: 16 }}
          />
        </Col>
      </Row>
  
      <div style={{ color: "red", marginBottom: 16 }}>
        {props.filterData.minAge && props.filterData.maxAge &&
          props.filterData.minAge >= props.filterData.maxAge ? 
          "Hata: Minimum yaş maksimum yaştan büyük ve eşit olamaz." : null}
      </div>
  
      <Row gutter={16} style={{ marginTop: 50, marginBottom: 0 }}>
        <Col span={12}>
          <Button type="primary" danger style={{ width: "100%" }}
           onClick={props.handleClearFilter}
           disabled={
            (!props.filterData.country && 
            !props.filterData.city && 
            !props.filterData.role && 
            (props.filterData.minAge === '' || props.filterData.minAge === 0) && 
            (props.filterData.maxAge === '' || props.filterData.maxAge === 0)) 
          
          }
           >
            İptal
          </Button>
        </Col>
        <Col span={12}>
          <Button 
            type="primary" 
            style={{ backgroundColor: "green", borderColor: "green", width: "100%" }} 
            onClick={props.handleFilter}
            disabled={
              (!props.filterData.country && 
              !props.filterData.city && 
              !props.filterData.role && 
              (props.filterData.minAge === '' || props.filterData.minAge === 0) && 
              (props.filterData.maxAge === '' || props.filterData.maxAge === 0)) || 
              (props.filterData.minAge !== '' && props.filterData.minAge !== 0 && 
              props.filterData.maxAge !== '' && props.filterData.maxAge !== 0 && 
              props.filterData.minAge >= props.filterData.maxAge)
            }
          >
            Filtrele
          </Button>
        </Col>
      </Row>
    </Card>
  </Col>
  )
}

export default Filter
