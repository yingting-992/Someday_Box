// 儲存夢想資料（標題、靈感來源、自我鼓勵）
// 提供「新增夢想」、「刪除夢想」、「查找夢想」的方法
// 支援 useContext() 一行取資料，用法簡潔直觀
// 這個檔案管理全域的夢想資料，讓 App 任何地方都可以新增、刪除、讀取夢想

import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const DreamContext = createContext(); // 建立 Context 物件容器

// 建立 Provider 元件，負責管理所有夢想資料的狀態與方法
export function DreamProvider({ children }) {
    const [dreams, setDreams] = useState([]); // 管理夢想資料的狀態
    const [completedDreams, setCompletedDreams] = useState([]); // 管理已完成夢想的狀態

    // 新增夢想
    const addDream = (title, inspiration, motivation, priority) => {
        const newDream = {
            id: uuidv4(), // 產生唯一的 ID
            title,
            inspiration,
            motivation,
            priority,
            completed: false
        }
        setDreams((prev => [...prev, newDream])) // 更新狀態，將新夢想加入陣列
    }
    
    // 已達成的夢想 
        const completeDream = (id) => {
        const dreamToComplete = dreams.find((dream) => dream.id === id);
        if (!dreamToComplete) return; // 如果找不到對應的夢想，則不進行任何操作

        const dateStr = new Date().toISOString().split('T')[0]; // '2025-06-05'

        const completed = {
            ...dreamToComplete, // 保留原有夢想的屬性
            completed: true, // 標記為已完成
            completeDate: dateStr, // 記錄完成日期
        };

        // 1. 將它從原本夢想中移除
        setDreams((prev) => prev.filter((dream) => dream.id !== id));

        // 2. 加進成就清單
        setCompletedDreams((prev) => [...prev, completed]);
        console.log('加入成就夢想：', completed);

        };



    // 刪除夢想
    const deleteDream = (id) => {
        setDreams((prev) => prev.filter((dream) => dream.id !== id)) // 根據 ID 刪除夢想   filter() 方法會回傳一個新的陣列，包含所有不符合條件的元素
    }

    // 讓頁面可以用 id 讀出特定夢想內容
    const getDreamById = (id) => {
        return dreams.find((d) => d.id === id); // 根據 ID 查找夢想
    }
    console.log("DreamContext 已載入，目前夢想數量：", dreams.length);

    return(
        <DreamContext.Provider value={{ 
            dreams,
            setDreams,
            completedDreams,
            setCompletedDreams,
            getDreamById,
            deleteDream,
            completeDream,
            addDream,
        }}>
            {children} {/* 將子元件包在 Provider 裡面 */}
        </DreamContext.Provider>
    )

}

//	任何元件都可以用 const { dreams } = useDream() 直接存取資料
export function useDream(){
    return useContext(DreamContext); // 使用 useContext() 取得夢想資料
}