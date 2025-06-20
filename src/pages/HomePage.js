// HomePage.js
import React from 'react';
import { Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import CnnSleepSection from '../components/CnnSleepSection'; // 爬蟲
import CustomFooter from '../components/CustomFooter';
// import CnnCategoryTabs from '../components/CnnCategoryTabs'; // 爬蟲

const { Title, Text } = Typography;

// 根據當前時間回傳對應訊息
const getGreetingMessage = () => {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 6) return '🌙 夜深了，記得好好休息';
  if (hour >= 6 && hour < 11) return '☀️ 早安，今天想做點什麼？';
  if (hour >= 11 && hour < 14) return '🍱 午安，吃飽了嗎？';
  if (hour >= 14 && hour < 18) return '🌤 下午好，要不要來點輕鬆的事？';
  if (hour >= 18 && hour < 22) return '🌆 晚上好，今天過得怎麼樣？';
  return '🌙 夜深了，來點放鬆的活動吧';
};

const allSuggestions  = [
        '🌿 深呼吸三次，閉上眼睛放空 30 秒',
        '📓 寫一句今天最想感謝的事情',
        '🎶 放一首輕音樂讓自己放空一下',
        '☕️ 沖杯茶，什麼也不做 5 分鐘',
        '🧘‍♀️ 做一個貓式伸展',
        '📖 看一頁書，任何書都好',
        '🖼 看著窗外、放空一下',
        '🧠 想一件最近讓你開心的小事',
    ];
const HomePage = () => {
    const greeting = getGreetingMessage();
    
    const getRandomThree = () => {
        const shuffled = [...allSuggestions ].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }
    const [suggestions, setSuggestions] = React.useState(getRandomThree());
    const handleRefresh = () => {
    setSuggestions(getRandomThree());
    };
    return (
        <div
        style={{
            minHeight: '100vh',
            padding: '3rem 3rem 0',
            background: 'linear-gradient(to bottom right, #e3f2fd, #fce4ec)',
        }}
        >
        {/* 標題區塊淡入 */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <Title level={2} style={{ textAlign: 'center' }}>
                {greeting}
            </Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
                給你三個溫柔的小建議，當作今天的起點 🌸
            </Text>
        </motion.div>

        {/* 建議卡片慢慢飄入  npm install framer-motion*/}
        <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
            {suggestions.map((s, i) => (
            <Col xs={24} sm={12} md={8} key={i}> 
                <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 + i * 0.2 }}
                >
                <GlassCard text={s} />
                </motion.div>
            </Col>
            ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
                onClick={handleRefresh}
                style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #ffffff40',
                    color: '#333',
                    borderRadius: '999px',
                    padding: '0.6rem 1.5rem',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center', 
                    marginTop: '2rem'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)'; // 碰到
                    e.currentTarget.style.background = 'rgb(255, 255, 255)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';  // 沒碰
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                }}
            >✨ 換一組建議</button>
        </div>
        <br/><br/>
        <hr style={{ border: '1.5px solid rgba(86, 86, 87, 0.5)' }}/>
        <div>
            <CnnSleepSection />
            {/* <CnnCategoryTabs /> */}
        </div>
        <div>
            <CustomFooter/>
        </div>
    </div>
  );
};

export default HomePage;
