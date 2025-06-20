// // 加入完成夢想按鈕
// import React from 'react';
// import { useDream } from '../context/DreamContext';
// import { List, Tag } from 'antd';
// export default function CompletedDreamsPage() {
//     const {dreams} = useDream();
//     const completed = dreams.filter(d=>d.completed); // 過濾出已完成的夢想

//     return (
//         <div>
//             <h1>已完成的夢想</h1>
//             <p>這裡是你所有已完成的夢想，恭喜你！</p>
//             {completed.length === 0 && <p>目前還沒有任何已完成的夢想，快去完成一個吧！</p>}
//             {completed.map(dream => (
//                 <li key={dream.id} style={{ marginBottom: '1rem' }}>
//                     {dream.title} - 完成日期: {dream.completeDate}
//                 </li>
//             ))}
//             <List
//                 dataSource={completed}
//                 renderItem={(dream, index) => (
//                     <List.Item>
//                     <Tag color="green">{index + 1}</Tag>
//                     {dream.title}（完成日：{dream.completeDate}）
//                     </List.Item>
//                 )}
//             />

//         </div>
//     );
// }