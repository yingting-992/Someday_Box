// import React, { useEffect, useState } from 'react';
// import { Tabs, Spin, List, Typography, Radio } from 'antd';
// import { useTranslation } from 'react-i18next';

// const { Title, Paragraph } = Typography;

// const categories = [
//   { key: 'sleep', label: '🛏 睡覺', file: '/cnn_sleep_articles.json' },
//   { key: 'health', label: '💆 健康', file: '/cnn_health_articles.json' },
//   { key: 'food', label: '🍱 飲食', file: '/cnn_food_articles.json' },
// ];

// const CnnCategoryTabs = () => {
//   const { t, i18n } = useTranslation(); // i18n 用來切 UI 語言
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [lang, setLang] = useState('zh'); // 預設內容語言為中文

//   useEffect(() => {
//     const loadAll = async () => {
//       setLoading(true);
//       const newData = {};

//       for (const cat of categories) {
//         try {
//           const res = await fetch(cat.file);
//           const json = await res.json();
//           newData[cat.key] = json;
//         } catch (e) {
//           console.error(`❌ 無法載入 ${cat.file}`, e);
//           newData[cat.key] = [];
//         }
//       }

//       setData(newData);
//       setLoading(false);
//     };

//     loadAll();
//   }, []);

//   if (loading) return <Spin tip="資料載入中..." style={{ display: 'block', marginTop: '5rem' }} />;

//   return (
//     <div
//       style={{
//         background: 'rgba(255, 253, 255, 0.9)',
//         padding: '3rem 1.5rem',
//         borderRadius: '16px',
//         boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
//         maxWidth: '1000px',
//         margin: '3rem auto',
//       }}
//     >
//       {/* 語言切換區塊 */}
//       <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
//         <Radio.Group value={lang} onChange={e => setLang(e.target.value)}>
//           <Radio.Button value="zh">中文</Radio.Button>
//           <Radio.Button value="en">English</Radio.Button>
//         </Radio.Group>
//       </div>

//       {/* 分類切換 */}
//       <Tabs
//         defaultActiveKey="sleep"
//         centered
//         items={categories.map((cat) => ({
//           key: cat.key,
//           label: cat.label,
//           children: (
//             <List
//               itemLayout="vertical"
//               dataSource={data[cat.key]}
//               renderItem={(item) => (
//                 <List.Item>
//                   <Title level={4}>
//                     <a href={item.link} target="_blank" rel="noopener noreferrer">
//                       {lang === 'en' ? item.title_en || item.title : item.title_zh || item.title}
//                     </a>
//                   </Title>
//                   <Paragraph style={{ fontSize: '15px' }}>
//                     {lang === 'en'
//                       ? item.content_en || item.content
//                       : item.content_zh || item.translated || '（尚無翻譯）'}
//                   </Paragraph>
//                 </List.Item>
//               )}
//             />
//           ),
//         }))}
//       />
//     </div>
//   );
// };

// export default CnnCategoryTabs;
