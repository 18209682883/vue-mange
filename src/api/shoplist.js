import request from '../utils/request'
// 商品列表数据
export function getShopList(page,limit,tab){
    return request({
        url:`/goods/${page}?limit=${limit}&tab=${tab}`,
        method:'GET',
        data:{
            page,
            limit,
            tab
        }
    })
}