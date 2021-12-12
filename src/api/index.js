const api = 'youngoldman.top/api:5555'
// const api = 'http://localapi:10000'

export default {
  getUser(){return api + '/user'},
  
  login(){return getUser()+'/login'},
  /*
  getCompany () {
    return api + '/company'
  },
  userRegister () {
    return api + '/user'
  },
  // 获取全部公司信息
  getComName () {
    return api + '/company/noPage'
  },
  userLogin () {
    return api + '/user/login'
  },
  getUserInfo () {
    return api + '/user'
  },
  sendCode () {
    return api + '/outside/code'
  },
  logout () {
    return api + '/user/logout'
  },
  // 提交简历信息
  sendResume () {
    return api + '/resume'
  },
  // 获取投递列表
  deliveryList () {
    return api + '/user/send'
  },
  // 提交用户信息
  putUserInfo () {
    return api + '/user/info'
  },
  // 修改用户手机号码
  changePhone () {
    return api + '/user/phone'
  },
  // 修改用户密码
  changePass () {
    return api + '/user/password'
  },
  // 修改用户邮箱
  changeEmail () {
    return api + '/user/email'
  },
  // 获取公司详情
  getCompanyDetail (id) {
    return api + `/company/${id}`
  },
  // 获取简历信息
  getResume () {
    return api + '/resume'
  },
  // 获取岗位详细信息
  getJobDetail (id) {
    return api + `/recruit/${id}`
  },
  // 投递简历
  deliveryReusme () {
    return api + '/recruit/resume'
  },
  // 获取站内信
  getMessage () {
    return api + '/message/user/get'
  },
  // 搜索职位信息
  findJob () {
    return api + '/recruit'
  },
  // 已读
  readMessage () {
    return api + '/message/read'
  },
  // hr resumelist
  receiveResume () {
    return api + '/user/receive'
  },
  // hr发布职位信息
  publishJob () {
    return api + '/recruit'
  },
  // 查看hr发布的职位信息
  checkJob () {
    return api + '/recruit/hr'
  },
  deletejob () {
    return api + '/recruit'
  },
  hrRegister () {
    return api + '/user/hr'
  },
  // 推荐候选人
  recommendCandidate () {
    return api + '/recruit/recommend/candidate'
  },
  // 推荐职位
  recommendJob () {
    return api + '/recruit/recommend/job'
  },
  // 获取感兴趣的工作
  getRecommandJob () {
    return api + '/recruit/name'
  }
  */
}
