import React from 'react';
import { Card, Typography } from 'antd';

//首頁玻璃卡

const { Text } = Typography;

const GlassCard = ({ text, color }) => {
  return (
    <Card
      // bordered={false}
      hoverable
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        padding: '1rem',
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color || '#333',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Text strong>{text}</Text>
    </Card>
  );
};

export default GlassCard;
