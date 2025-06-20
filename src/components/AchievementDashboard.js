import React from 'react';
import { Typography, Row, Col, Progress, List, Tag } from 'antd'; // 用了 Ant Design 的 Typography、Row、Col 和 Progress 組件
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // 用 Recharts 庫來繪製圖表
import dayjs from 'dayjs'; // 用 dayjs 處理日期

//成就儀表板
const { Title } = Typography; // 從 Ant Design 中引入 Title 組件

const AchievementDashboard = ({ completedDreams, uncompletedCount }) => { 
    // 進度條
    const completedCount = completedDreams.length; // 計算已完成的夢想數量
    const totalCount = completedCount + uncompletedCount; // 總夢想數量 = 已完成 + 未完成
    const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100); // 計算完成率，避免除以零的錯誤

    // 稱號邏輯
    let level = '🌱 夢想小萌芽';
    let nextLevelTarget = 4;
    if (completedCount >= 4 && completedCount <= 6) {
    level = '🌿 正在成長';
    nextLevelTarget = 7; // 下一個目標是 7 個完成的夢想
    } else if (completedCount >= 7 && completedCount <= 14) {
    level = '🌳 追夢實踐家';
    nextLevelTarget = 14; // 下一個目標是 14 個完成的夢想
    } else if (completedCount > 14) {
    level = '🏆 夢想達成者';
    nextLevelTarget = null; // 已達成最高等級
    }
    // 等級提示文字
    let progressText = null;
    if (nextLevelTarget === null) {
    progressText = '你已達到最高等級 🎉';
    } else if (nextLevelTarget - completedCount > 0) {
    progressText = `再完成 ${nextLevelTarget - completedCount} 項就升級！`;
    } else {
    progressText = '🎉 你剛達到新等級！';
    }

    // 折線圖資料
    const chartData = {};
    completedDreams.forEach(dream => {
    const date = dayjs(dream.complete_date).format('YYYY-MM-DD'); // 確保格式統一
    chartData[date] = (chartData[date] || 0) + 1;
    });
    const lineChartData = Object.entries(chartData)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));  // 排序！

    // 圓餅圖資料
    const COLORS = ['#02DF82', '#ADADAD']; // 定義圓餅圖的顏色

    return (
        <div style={{ padding: '1rem' }}>
              {/* 左欄：完成夢想清單 */}
            <Row gutter={32}>
                <Col span={6}>
                    <Title level={4}>📝 已完成的夢想</Title>
                    <List
                    size="small"
                    dataSource={completedDreams}
                    bordered
                    renderItem={(item, index) => (
                        <List.Item>
                        <div>
                            <div>
                            <Tag color="green" style={{ marginRight: '0.5rem' }}>
                                {index + 1}
                            </Tag>
                            {item.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#999' }}>
                            完成於 {dayjs(item.complete_date).format('YYYY-MM-DD')}
                            </div>
                        </div>
                        </List.Item>
                    )}
                    />
                </Col>
                <Col span={18}> 
                    
                    <Col span={24}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end', // 右上角對齊
                        paddingRight: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1px 1fr', // 兩欄＋中間線
                        alignItems: 'center',
                        textAlign: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '0.75rem 0.5rem', 
                        minWidth: '240px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', 
                        }}>
                        <div>
                        <div style={{ fontWeight: 'bold', color:'black' }}>已完成</div>
                        <div style={{ fontWeight: 'bold' , fontSize: "large", color:'black' }}>{completedCount}</div>
                        </div>
                        {/* 垂直分隔線 */}
                            <div style={{
                                height: '100%',
                                width: '1px',
                                backgroundColor: '#e0e0e0'
                            }}></div>
                        <div>
                        <div style={{ fontWeight: 'bold', color:'gray' }}>未完成</div>
                        <div style={{ fontWeight: 'bold' , fontSize: "large", color:'gray' }}>{uncompletedCount}</div>
                        </div>
                        </div>
                    </div>
                    </Col>


            {/* 完成多少夢想里程碑 */}
            <Title level={4}>
                ✨ 成就稱號：{level}
                <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: '#999' }}>
                    {progressText}
                </span>
            </Title>
            {/* 進度條 */}
            <Progress percent={completionRate} status="active"/>

            
                <Row gutter={16}> 
                    <Col span={12}> 
                    {/* 圓餅圖 */}
                    <Title level={5}>🎯 完成比例</Title>
                    <ResponsiveContainer width="100%" height={250}>
                        
                        <PieChart>
                        <Pie
                            dataKey="value"
                            data={[
                            { name: '已完成', value: completedCount },
                            { name: '未完成', value: uncompletedCount },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80} 
                            // 將兩個顏色設為綠色和淺綠色
                            label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%`}
                            style={{
                                outline: 'none',
                                border: 'none',
                                // WebkitTapHighlightColor: 'transparent', 
                            }}
                        >
                        {
                            [0, 1].map(index => ( 
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                        </Pie>
                        
                        </PieChart>
                    </ResponsiveContainer>
                    </Col>
                    
                    {/* 折線圖 */}
                    <Col span={12}>
                    <Title level={5}>📈 每日完成紀錄</Title>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineChartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                    </Col>
                </Row>
            </Col>
        </Row>
            {/* 夢想列表 */}
        </div>
    );
};

export default AchievementDashboard;
