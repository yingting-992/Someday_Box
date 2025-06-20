import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
// import { useDream } from '../context/DreamContext';
import AchievementDashboard from '../components/AchievementDashboard'; 
import CustomFooter from '../components/CustomFooter';

const { Title } = Typography;
const { Content } = Layout;

const GardenPage = () => {
  // const { dreams, completedDreams } = useDream();
  // const uncompletedCount = dreams.filter(d => !d.completed).length;useEffect(() => {

  const [dreams, setDreams] = useState([]);
  const [completedDreams, setCompletedDreams] = useState([]);    
  useEffect(() => {
      fetch("http://localhost/Dreams/getDreams.php")
        .then(res => res.json())
        .then(data => {
          setDreams(data);
          const completed = data.filter(d => d.completed === "1" || d.completed === 1);
          setCompletedDreams(completed);
        });
  }, []);


  const uncompletedCount = dreams.filter(d => d.completed !== "1" && d.completed !== 1).length;

  return (
    <div>
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '1rem 2rem 2rem 2rem' }}>
        <Title level={2}>🌼 我的成就總覽</Title>
        <AchievementDashboard
          completedDreams={completedDreams} // 已完成的夢想清單
          uncompletedCount={uncompletedCount} // 未完成的夢想數量
        />
      </Content>
    </Layout>
    <div>
        <CustomFooter />
    </div>
    </div>


    
  );
};

export default GardenPage;
