import React from 'react';
import { motion } from 'framer-motion';

// 泡泡
const getSizeByPriority = (priority) => {
  const sizeMap = {
    1: 150,
    2: 100,
    3: 80,
    4: 65,
    5: 50
  };
  return sizeMap[priority] || 80;
};

// 生成隨機位置   
const getRandomPosition = () => { 
  const x = Math.random() * (window.innerWidth - 300);  // 確保泡泡不會超出視窗範圍
  const y = Math.random() * (window.innerHeight - 300); 
  return { left: `${x}px`, top: `${y}px` }; // 轉成 CSS 可用的屬性
};

const Bubble = ({ text, color, id, onClick, index, priority = 3 }) => {
  const size = getSizeByPriority(priority);
  const pos = getRandomPosition(index); // 生成隨機位置

  return (
    <motion.div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        position: 'absolute',
        ...pos,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        padding: '0.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        textAlign: 'center', 
        lineHeight: '1.2',
        wordBreak: 'break-word', // 讓長文字自動換行
      }}
    
      // 動畫效果
      animate={{ 
          y: [0, -5, 0, 5, 0],
          x: [0, 2, -2, 2, 0],
      }}
      // 動畫過渡效果
      transition={{ 
          duration: 6 + Math.random() * 2, // 每個泡泡的動畫持續時間隨機
          repeat: Infinity, // 無限循環
          ease: 'easeInOut', // 緩動效果
        }}
    >
        {text}
    </motion.div>
  );
}
export default Bubble;
