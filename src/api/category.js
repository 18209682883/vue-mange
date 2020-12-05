import request from '../utils/request'
// 获取商品分类列表数据
export function getCategoryList(){
    return request({
        url:`/category`,
        method:'GET'
    })
}