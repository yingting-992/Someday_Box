// 新增夢想頁面
// 使用表單新增夢想，包含標題、靈感與動機欄位

import React from 'react';
// import { useNavigate } from 'react-router-dom'; // npm install react-router-dom 這是用於導航的 Hook
// import { useDream } from '../context/DreamContext'; // 引入夢想資料的 Context
import DreamForm from '../components/DreamForm'; // 引入表單元件
export default function AddDreamPage(){
    // const [title, setTitle] = useState('');
    // const [inspiration, setInspiration] = useState(''); // 輸入1 靈感來源
    // const [motivation, setMotivation] = useState(''); // 輸入2 動機
    // const { addDream } = useDream(); // 從 Context 中取得新增夢想的方法
    // const navigate = useNavigate(); // 用於導航的 Hook
    // const { title, inspiration, motivation, priority } = values;
    // addDream(title, inspiration, motivation, priority);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(!title.trim()) return alert('欸! 記得輸入你的新想法鴨!!!!') // 如果標題為空，則不提交)
    //     addDream(title, inspiration, motivation); // 呼叫 Context 中的新增夢想方法
    //     setTitle(''); // 清空標題輸入框
    //     navigate('/someday')
    // }

    return(
        <div style={{ padding: '2rem' }}>
            <DreamForm/>
        </div>
    )
}