import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

try {
  console.log('正在读取Excel文件...');
  
  // 读取Excel文件
  const filePath = path.resolve('69f4ca52842a94c27f049d26_星际猎人_舰船图鉴_完整版.xlsx');
  const workbook = XLSX.readFile(filePath);
  
  // 获取第一个sheet
  const sheetName = workbook.SheetNames[0];
  console.log('Sheet名称:', sheetName);
  
  const worksheet = workbook.Sheets[sheetName];
  
  // 转换为JSON
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  console.log(`共读取到 ${data.length} 条数据`);
  
  // 保存原始数据
  const outputPath = path.resolve('src/data/raw-ship-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log('原始数据已保存到:', outputPath);
  
  // 解析为我们需要的格式
  const processedShips = data.map((ship, index) => {
    const tagsStr = ship['标签'] || '';
    const tags = tagsStr ? tagsStr.split('、').map(t => t.trim()) : [];
    
    const modulesStr = ship['模块系统'] || '';
    const modules = modulesStr 
      ? modulesStr.split('；').map(m => m.replace(/[“”"]/g, '').trim()) 
      : [];
    
    // 处理数字值
    const getNumber = (val) => {
      if (val === undefined || val === null || val === '') return 0;
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    };
    
    // 处理可能缺失的字段，设置默认值
    return {
      id: String(ship['序号'] || index + 1),
      name: ship['名称'] || `舰船${index + 1}`,
      rarity: ship['获取难度'] || '3星',
      faction: ship['所属势力'] || '未知势力',
      type: ship['类型'] || '未知类型',
      weaponType: ship['武器类型'] || '通用武器',
      weaponRole: ship['武器定位'] || '综合',
      attackAttr: ship['攻击属性'] || '实弹',
      position: ship['舰船站位'] || '中排',
      obtainType: ship['获取类型'] || '普通',
      stats: {
        antiShipFirepower: getNumber(ship['对舰火力']),
        antiAirFirepower: getNumber(ship['对空火力']),
        siegeFirepower: getNumber(ship['攻城火力']),
        structureValue: getNumber(ship['结构值']),
        damageResistance: getNumber(ship['抵抗伤害']),
        shieldValue: ship['护盾值'] || '0%',
        cruiseSpeed: getNumber(ship['巡航速度']),
        warpSpeed: getNumber(ship['曲率速度']),
        storageCapacity: getNumber(ship['仓储容量'])
      },
      ratings: {
        antiShip: ship['评级-对舰'] || 'C',
        antiAir: ship['评级-防空'] || 'C',
        siege: ship['评级-攻城'] || 'C',
        support: ship['评级-支援'] || 'C',
        survival: ship['评级-生存'] || 'C',
        strategy: ship['评级-战略'] || 'C'
      },
      build: {
        metal: getNumber(ship['成本(金属)']),
        crystal: getNumber(ship['成本(晶体)']),
        deuterium: getNumber(ship['成本(重氢)']),
        time: ship['建造时间'] || '00:00:00',
        repairSpeed: ship['维修速度'] || '0/分钟'
      },
      commandValue: getNumber(ship['指挥值']),
      maxService: getNumber(ship['服役上限']),
      flagshipSkill: ship['旗舰技'] || '',
      tags: tags,
      modules: modules,
      image: '',
      wikiUrl: ship['Wiki链接'] || '',
      additionalInfo: {
        professionalCategory: ship['职业分类'] || '',
        length: ship['长度'] || '',
        implementationDate: ship['实装日期'] || ''
      }
    };
  });
  
  // 保存处理后的舰船数据
  const processedPath = path.resolve('src/data/ships.json');
  fs.writeFileSync(processedPath, JSON.stringify(processedShips, null, 2));
  console.log(`已处理 ${processedShips.length} 条舰船数据并保存到:`, processedPath);
  
  // 提取势力数据
  const factions = [...new Set(processedShips.map(s => s.faction))];
  const factionColors = ['#FF6B35', '#00D68F', '#4A9EFF', '#FFD700', '#9B59B6', '#3498DB', '#2ECC71', '#E74C3C'];
  const factionsData = factions.map((faction, index) => ({
    id: String(index + 1),
    name: faction,
    color: factionColors[index % factionColors.length]
  }));
  
  const factionsPath = path.resolve('src/data/factions.json');
  fs.writeFileSync(factionsPath, JSON.stringify(factionsData, null, 2));
  console.log(`已处理 ${factionsData.length} 个势力数据并保存到:`, factionsPath);
  
} catch (error) {
  console.error('解析Excel出错:', error);
  process.exit(1);
}
