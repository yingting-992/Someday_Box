// 這個 Navbar 元件用於顯示導航條，並根據當前路由高亮選中的菜單項目

import React, {  } from "react";
// import { Link } from "react-router-dom"; // npm install react-router react-router-dom
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './menuItems'; // 引入菜單項目配置

// 因在新增願望時成功時，畫面會跳回願望清單是正確的，但導航條沒跟著跑
// 那原因是 導航條的高亮 (selectedKeys) 沒有自動隨著路由變化更新。
const Navbar = () => {
    const navigate = useNavigate(); 
    const location = useLocation(); // 獲取當前路徑

    const currentPath = location.pathname.split('/')[1] || 'home'; // 根據當前路徑設定選中的菜單項目

    //   const onClick = (e) => {
    //     setCurrent(e.key);
    //     navigate(`/${e.key}`);
    //   };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu
        onClick={(e) => navigate(`/${e.key}`)} // 點擊菜單項目時導航到對應路徑
        selectedKeys={[currentPath]}
        mode="horizontal" // 水平模式
        items={menuItems}
      />      
    </div>

  );
};

export default Navbar;