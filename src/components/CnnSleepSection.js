import React, { useEffect, useState } from 'react';
import { Tabs, Spin, List, Typography, Radio } from 'antd';

import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const categories = [ 
  { key: 'sleep', icon: '🛏', file: '/cnn_sleep_articles.json' },
  { key: 'health', icon: '💆', file: '/cnn_health_articles.json' },
  { key: 'food', icon: '🍱', file: '/cnn_food_articles.json' },
];

const CnnCategoryTabs = () => {
    const [data, setData] = useState({}); // 初始化為空物件
    const [loading, setLoading] = useState(true); 
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('zh'); // 預設語言為中文

    //這段是載入爬蟲的資料
    //當語言變更時，更新 i18n 的語言設定
    useEffect(() => {  
        const loadAll = async () => {
            setLoading(true);
            const newData = {};

            for (const cat of categories) {
                try {
                const res = await fetch(cat.file);
                const json = await res.json();
                newData[cat.key] = json;
                } catch (e) {
                console.error(`❌ 無法載入 ${cat.file}`, e);
                newData[cat.key] = [];
                }
            }
        setData(newData);
        setLoading(false);
        };

        loadAll();
    }, []);

    // 資料載入中時顯示旋轉圖示
    if (loading) return <Spin tip="資料載入中..." style={{ display: 'block', marginTop: '5rem' }} />; 
    return (

        // 以下是i18n的語言切換
        <div
        style={{
            background: 'rgba(255, 253, 255, 0.85)',
            padding: '3rem 1.5rem',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            maxWidth: '1000px',
            margin: '3rem auto',
        }}
        >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Radio.Group value={lang}   // 預設語言為中文
            onChange={e => { // 當選擇語言時觸發
                const newLang = e.target.value; // 獲取選擇的語言
                setLang(newLang);
                i18n.changeLanguage(newLang); // 切換語言  三個標籤切換中英
            }}>
                <Radio.Button value="zh">中文</Radio.Button>
                <Radio.Button value="en">英文</Radio.Button>
            </Radio.Group>
        </div>

        {/* 這裡是用python爬蟲抓取的資料，資料來源是CNN的睡眠、健康和飲食相關文章，並且有中英文兩種語言版本。 */}
        <Tabs
            key={lang}
            defaultActiveKey="sleep" // 預設選擇第一個分類
            centered 
            items={categories.map((cat) => ({
                key: cat.key,
            //   label: cat.label,
                label: `${cat.icon} ${t(cat.key)}`, 
                children: (
                <List
                itemLayout="vertical"
                dataSource={data[cat.key]}
                renderItem={(item) => (
                    <List.Item>
                    <Title level={4}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {lang === 'en' ? item.title_en || item.title : item.title_zh || item.title}
                        </a>
                    </Title>
                    <Paragraph style={{ fontSize: '15px' }}>
                        {lang === 'en' ? item.content_en || item.content : item.content_zh || item.translated || '（尚無翻譯）'}
                    </Paragraph>
                    </List.Item>
                )}
                />
            ),
            }))}
        />
        </div>
    );
};

export default CnnCategoryTabs;
