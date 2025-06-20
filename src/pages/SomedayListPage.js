// 以前所寫的夢想目標
// src/pages/SomedayListPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { useDream } from '../context/DreamContext';  // 引入夢想資料的 Context 改用後端
import Bubble from '../components/Bubble';

const { Title } = Typography;

const bubbleColors = ['#f48fb1', '#90caf9', '#ce93d8', '#a5d6a7', '#ffcc80'];

const SomedayListPage = () => {
//   const { dreams } = useDream(); 改用後端
    const [dreams, setDreams] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
    fetch("http://localhost/Dreams/getDreams.php")
        .then((res) => res.json())
        .then((dreams) => {
        setDreams(dreams);
        });
    }, []);

//   已改成使用 Bubble 元件來顯示夢想清單 (inline)
//   const handleClick = (id) => {
//     navigate(`/dream/${id}`);
//   };


  return (
    <div
        style={{
            minHeight: '100vh',
            padding: '1rem 2rem 2rem 2rem',
            background: 'linear-gradient(to bottom right,rgb(253, 227, 227),rgb(250, 252, 228))',
        }}
>
      <Title level={2}>📝 夢想寶盒</Title>

        {/* 夢想清單是否為空？
        ├─ 是 → 顯示「還沒夢想」提示 + 新增按鈕
        └─ 否 → 顯示彩色 Tag 清單（點一下進入夢想詳情） */}

        {dreams.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Empty
                    description="還沒有夢想呢，快來寫下一個願望吧！"
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/add')}
                    style={{ marginTop: '1rem' }}
                >
                    新增夢想
                </Button>
            </div>
            ) : (
            <>
                <div    
                    style={{
                    position: 'relative',     // 這個超重要！
                    height: '80vh',           // 給泡泡一個活動範圍
                    overflow: 'hidden',       // 多出來的泡泡不顯示
                    padding: '2rem',
                    borderRadius: '1rem',
                }}>
                {dreams
                    .filter((dream) => dream.completed !== "1" && dream.completed !== 1) //!== "1" 就代表「只留下還沒完成的」。
                    .map((dream, index) => (
                        <Bubble
                            key={dream.id}
                            id={dream.id}
                            text={dream.title}
                            color={bubbleColors[index % bubbleColors.length]} // 循環使用顏色
                            index={index}
                            // onClick={() => markAsCompleted(dream)} // 新邏輯
                            onClick={() => navigate(`/dream/${dream.id}`)}
                            priority={Number(dream.priority)} // 假設每個夢想都有 priority 屬性
                    />
                ))}
                </div>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined style={{ fontSize: '2rem' }}  />}
                    onClick={() => navigate('/add')}
                    style={{
                        width: '80px',              //  自訂寬度
                        height: '80px',             //  自訂高度
                        borderRadius: '50%',         // 保持圓形
                        position: 'fixed',
                        right: '5rem',
                        bottom: '3rem',
                        zIndex: 1000,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
            </>
      )}
    </div>
  );
};

export default SomedayListPage;
