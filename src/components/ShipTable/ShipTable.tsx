import { Table } from 'antd';
import { Ship } from '../../types/ship';

interface ShipTableProps {
  ships: Ship[];
  loading?: boolean;
}

const ShipTable: React.FC<ShipTableProps> = ({ ships, loading = false }) => {
  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name', width: 200 },
    { title: '势力', dataIndex: 'faction', key: 'faction', width: 150 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 120 },
    { title: '站位', dataIndex: 'position', key: 'position', width: 100 },
    { title: '稀有度', dataIndex: 'rarity', key: 'rarity', width: 100 },
    { title: '对舰火力', dataIndex: ['stats', 'antiShipFirepower'], key: 'antiShip', width: 120 },
    { title: '结构值', dataIndex: ['stats', 'structureValue'], key: 'structure', width: 100 },
    { title: '指挥值', dataIndex: 'commandValue', key: 'commandValue', width: 100 },
    { title: '获取类型', dataIndex: 'obtainType', key: 'obtainType' }
  ];

  return (
    <Table
      columns={columns}
      dataSource={ships}
      rowKey="id"
      loading={loading}
      scroll={{ x: 1000 }}
    />
  );
};

export default ShipTable;
