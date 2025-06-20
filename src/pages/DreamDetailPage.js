// DreamDetailPage.js
// // 點擊somedayList中的某一個夢想，跳轉到該夢想的詳細頁面
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
// useParams 用於獲取路由參數，useNavigate 用於導航
// import { useDream } from '../context/DreamContext'; // 改用後端
import { Button, Spin, message } from 'antd';

export default function DreamDetailPage(){
    const { id } = useParams(); // 從路由參數中獲取夢想的 ID
    const navigate = useNavigate(); // 用於導航的 Hook
    const [dream, setDream] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // const { 
    //     dreams,
    //     deleteDream,
    //     completeDream,
    // } = useDream();  改後端這不用了
    // const dream = dreams.find(d => d.id === id);   改後端這不用了

    // 撈資料
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost/Dreams/getDreamById.php?id=${id}`)  //處理單一筆夢想資料
        .then((res) => res.json())
        .then((data) => {
            setDream(data);
            setLoading(false);
            
        })
        .catch((err) => {
            message.error("載入夢想失敗");
            setLoading(false);
        });
    }, [id]);


    if (!dream) {
        return <div>夢想不存在或已被刪除</div>; // 如果夢想不存在，顯示提示
    }
    // 處理刪除
    const handleDelete = () => {
        if (window.confirm('確定要刪除這個夢想嗎？')) { // 確認是否刪除
            // deleteDream(id); // 呼叫 deleteDream 方法來刪除夢想
            // navigate('/someday'); // 刪除後導航回夢想列表頁
            fetch(`http://localhost/Dreams/deleteDream.php?id=${id}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then((result) => {
            if (result.success) {
                message.success("夢想已刪除");
                navigate("/someday");
            } else {
                message.error("刪除失敗：" + result.message);
            }
            });
        }
    }

    // 處理完成
//     const handleComplete = async () => {
//   try {
//     const res = await fetch("http://localhost/Dreams/completeDream.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),   // ← 把 id 寫入 JSON
//     });

//     // 先確認 HTTP 狀態碼
//     if (!res.ok) throw new Error(await res.text());
//     const result = await res.json();

//     if (result.success) {
//       message.success("夢想完成！");
//       navigate("/garden");
//     } else {
//       message.error("完成失敗：" + result.message);
//     }
//   } catch (err) {
//     console.error(err);
//     message.error("伺服器回應格式錯誤，請檢查 PHP 是否正確回傳 JSON");
//   }
// };
    const handleComplete = () => {
        // navigate('/garden'); // 跳到成就介面
        // completeDream(dream.id); // 呼叫 completeDream 方法來標記夢想為已完成

        fetch(`http://localhost/Dreams/completeDream.php?id=${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, completed: true }), // 將 id 和 completed 狀態寫入 JSON
        })
        .then((res) =>  res.json())
        // // .then(txt => { console.log(txt); return JSON.parse(txt); }) // 解析回傳的文字為 JSON
        .then((result) => {
            if (result.success) {
            message.success("夢想完成！");
            console.log("夢想完成")
            navigate("/garden");
            } else {
            message.error("完成失敗：" + result.message);
            }
        });
    };

    if (loading) return <Spin tip="載入中..." />;

    return(
        <div
            style={{
                margin: '0rem auto',
                maxWidth: '720px',
                background: '#fff',
                padding: '0rem 2rem 2rem 2rem',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                fontFamily: 'Arial, sans-serif',
                lineHeight: 1.8,
            }}
            >
            <h2 style={{ fontSize: '1.75rem', color: '#444', marginBottom: '1rem' }}>
                ✨ {dream.title}
            </h2>
            <p style={{ fontSize: '1rem', color: '#333' }}>
                <strong>📌 靈感來源是什麼呢：</strong><br />
                <span style={{ color: '#666' }}>{dream.inspiration}</span>
            </p>

            <p style={{ fontSize: '1rem', color: '#333', marginTop: '1.5rem' }}>
                <strong>🔥 如果之後對這件事沒熱誠了，你要怎麼喚醒自己：</strong><br />
                <span style={{ color: '#666' }}>{dream.motivation}</span>
            </p>

            {/* 
            {dream.completed && ( // 如果夢想已完成，顯示已完成標籤
                <p style={{ color: 'green' }}><strong> 已完成</strong>{dream.completedDate}</p>
            )}*/}

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>

            {/* 如果夢想未完成，顯示完成按鈕 */}
            {!dream.completed && ( 
                <Button onClick={handleComplete} type="primary" >完成夢想</Button>
            )}  
            <Button danger onClick={handleDelete}  >刪除夢想</Button>
            <Button onClick={() => navigate('/someday')}>返回夢想列表</Button>
            </div>
            


        </div>
    );

};