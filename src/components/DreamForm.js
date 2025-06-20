// components/DreamForm.js
import React from 'react';
import { Button, Form, Input, Typography, message, Select } from 'antd';
// import { useDream } from '../context/DreamContext';
import { useNavigate } from 'react-router-dom';
// 寫入夢想
// const { Option } = Select;
export default function DreamForm() {
  const { Title } = Typography; 

  const [form] = Form.useForm();
  // const { addDream } = useDream();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { title, inspiration, motivation, priority } = values;
    try {
        const res = await fetch("http://localhost/Dreams/saveDream.php", { //saveDream.php用來儲存夢想的API
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, inspiration, motivation, priority }), // 將表單資料轉為JSON格式
        });
        const result = await res.json(); // 解析回傳的JSON結果
        console.log("回傳結果", result);
        if (result.success === true) {
          message.success("夢想已成功儲存！");
          navigate("/someday");

        } else {
          message.error("寫入失敗：" + result.message);
        }
      } catch (err) {
        message.error("🚫 發生錯誤：" + err.message);
      }
    };
  

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <Title level={2}>✨ 新增夢想</Title>
      <Form
        layout="vertical"
        form={form}
        name="add-dream"
        onFinish={onFinish}
        autoComplete="off"
      >
      <Form.Item
          label="嘿嘿 快說說你的新夢想吧！"
          name="title"
          rules={[{ required: true, message: '請輸入夢想標題！' }]}
        >
          <Input placeholder="例如：環島旅行、出版一本書..." />
      </Form.Item>

      <Form.Item
          label="靈感來源是什麼呢"
          name="inspiration"
          rules={[{ required: true, message: '請輸入靈感來源！' }]}
        >
          <Input.TextArea rows={4} placeholder="分享一下你的靈感來源..." />
        </Form.Item>

      <Form.Item
          label="那如果之後對這件事沒熱誠了，你要怎麼喚醒自己"
          name="motivation"
          rules={[{ required: true, message: '請輸入喚醒自己的方法！' }]}
        >
          <Input.TextArea rows={4} placeholder="分享一下你的喚醒方法..." />
      </Form.Item>
      <Form.Item
        label="優先順序"
        name="priority"
        rules={[{ required: true, message: '請選擇優先順序' }]}
      >
        <Select placeholder="選擇這個夢想的優先程度">
          <Select.Option value={1}>🔥 馬上就想做</Select.Option>
          <Select.Option value={2}>🎯 近期目標</Select.Option>
          <Select.Option value={3}>☁️ 靈感筆記</Select.Option>
          <Select.Option value={4}>⏳ 等待時機</Select.Option>
          <Select.Option value={5}>🌈 長期願望</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
          <Button type="primary" htmlType="submit">
            儲存夢想
          </Button>
      </Form.Item>
      
    </Form>
  </div>
  );
}

