import axios from 'axios';
const attributeUrl = '/api/lmm-standard/v4'; // dev

export default {
  // 获取添加人列表
  async getCreatorList(params) {
    const { data = {} } = await axios.get(`${attributeUrl}/class-features/list-creator`, { params });
    return Object.keys(data).map((creatorId) => ({
      creatorId,
      creatorName: data[creatorId],
    }));
  },
  // 属性值列表
  async getAttrValList(params) {
    const {
      data: { records = [], totalCount = 0 },
    } = await axios.post(`${attributeUrl}/class-feature-values/list-page`, params);
    return {
      records,
      totalCount,
    };
  },
  async saveAttrValFromHistory(params) {
    await axios.post(`${attributeUrl}/class-feature-values/create-from-exists`, params);
  },

  // 编辑属性值
  async editAttrVal(featureValueId, params) {
    await axios.put(`${attributeUrl}/feature-values/${featureValueId}`, params);
  },
  // 直接新建属性值
  async addDirectlyAttrVal(params) {
    await axios.post(`${attributeUrl}/class-feature-values`, params);
  },
  // 属性值-导入
  async attrValImport(params) {
    await axios.post(`${attributeUrl}/class-feature-values/import-excel`, params);
  },
  // 属性值-下载模板
  async attrValExcelDownloadTemplate(templateName) {
    return await axios.get(`${attributeUrl}/common/download-template/${templateName}`, { responseType: 'blob' });
  },
  // 删除单个属性值
  async deleteAttrVal(params) {
    await axios.delete(`${attributeUrl}/class-feature-values/${params.id}`);
  },
  // 批量删除属性值
  async batchDeleteAttrVal(params) {
    await axios.delete(`${attributeUrl}/class-feature-values/batch`, { data: params.ids });
  },
  // 发布属性值
  async publishAttrVal(params) {
    await axios.put(`${attributeUrl}/feature-values/publish`, params.ids);
  },
};
