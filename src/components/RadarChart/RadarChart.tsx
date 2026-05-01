import { Card, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;

const RadarChart: React.FC = () => {
  const option = {
    title: { text: '舰船属性雷达图' },
    tooltip: {},
    radar: {
      indicator: [
        { name: '对舰', max: 100 },
        { name: '防空', max: 100 },
        { name: '攻城', max: 100 },
        { name: '支援', max: 100 },
        { name: '生存', max: 100 },
        { name: '战略', max: 100 }
      ]
    },
    series: [{ type: 'radar', data: [{ value: [60, 70, 50, 80, 90, 70] }] }]
  };

  return (
    <Card>
      <Title level={3}>属性雷达图</Title>
      <ReactECharts option={option} />
    </Card>
  );
};

export default RadarChart;
