// 原本有新增夢想導航列，但邏輯來說應該放在夢想清單頁內
import {
  AppstoreOutlined,
  // MailOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';

export const menuItems = [
  {
    label: '首頁',
    key: 'home',
    icon: <SmileOutlined />,
  },
  {
    label: '夢想清單',
    key: 'someday',
    icon: <AppstoreOutlined />,
  },
  // {
  //   label: '新增夢想',
  //   key: 'add',
  //   icon: <MailOutlined />,
  // },

  {
    label: '成就種子',
    key: 'garden',
    icon: <SettingOutlined />,
  },
];