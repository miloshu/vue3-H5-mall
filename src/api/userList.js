
export default {
  // 定义用户数据
  data: {
    status: 0,
    total: 6,
    //前两个用户数据分别固定设为管理员和普通用户，为后续权限设置做准备，其他用户随机生成
    data: [{
      username: 'superadmin',
      password: '123456',
      roles: 'superadmin',
      name: '张三',
      age: 30,
      job: '前端工程师',
      token: '000111222333444555666',
      id: '1',
      phone: "13710191879",
      level: "V0",
      current_score: 0,
      dif_score: "距下一等级还需 30 成长值",
      avatar: 'https://',
      // 用户的收货地址
      selectedAddress: [

      ]
    }, {
      username: 'admin',
      password: '123456',
      roles: 'admin',
      name: '测试1',
      'age|20-30': 25,
      job: '前端工程师',
      token: '145145145123123123111',
      id: '2',
      phone: "18666876626",
      level: "V3",
      current_score: 0,
      dif_score: "距下一等级还需 100 成长值",
      avatar: 'https://',
      // 用户的收货地址
      selectedAddress: [
        
      ]
    }, {
      username: '@word(3, 5)',
      password: '123456',
      roles: 'editor',
      name: '@cname',
      'age|20-30': 20,
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', 'UX工程师'],
      token: '@guid()',
      id: '102',
      phone: "18972284898",
      level: "V1",
      current_score: 0,
      dif_score: "距下一等级还需 20 成长值",
      avatar: 'https://',
      // 用户的收货地址
      selectedAddress: [
        
      ]
    }],
    meta: {
      status: 200,
      message: 'success',
    }
  },
};
