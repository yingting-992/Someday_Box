import React from 'react';
import { Layout, Row, Col, Typography, QRCode } from 'antd';

const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const CustomFooter = () => {
  const qrText = React.useState('https://example.com');

  return (
    <Footer
      style={{
        backgroundColor: '#ffffff',
        // borderTop: '1px solid #eaeaea', 
        padding: '2.5rem 2rem 1.5rem 2rem',
        marginTop: '0rem',
        // borderRadius: '16px',
      }}
    >
      <Row justify="space-between" align="middle">
        {/* 左側：學號與聯絡資訊 */}
        <Col xs={24} md={8}> {/* xs: 24 在小螢幕上佔滿整行，md: 8 在中等以上螢幕上佔 8/24 */}
          <Title level={5} style={{ marginBottom: 8 }}>👩‍💻 製作者資訊</Title>
          <Paragraph style={{ margin: 0 }}>學號：C112156130</Paragraph>
          <Paragraph style={{ margin: 0 }}>姓名：沈映廷</Paragraph>
          <Paragraph style={{ margin: 0 }}>Email：C112156130@nkust.edu.tw</Paragraph>
        </Col>

        {/* 右側：QRCode*/}
        <Col xs={24} md={3} style={{ textAlign: 'right' }}>
          <QRCode value={qrText || '-'} size={120} />
        </Col>
      </Row>

      {/* 下方版權區 */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Text type="secondary">© 2025 Someday Box. All rights reserved.</Text>
      </div>
    </Footer>
  );
};

export default CustomFooter;
