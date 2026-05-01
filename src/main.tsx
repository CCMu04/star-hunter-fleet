import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#4A9EFF',
            colorBgContainer: '#131A2B',
            colorText: '#E8ECF1',
            colorTextSecondary: '#8892A4',
            borderRadius: 8,
          },
          components: {
            Layout: {
              bodyBg: '#0A0E17',
              headerBg: '#131A2B',
            },
            Card: {
              headerBg: '#0A0E17',
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)