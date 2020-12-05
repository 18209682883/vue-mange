import request from '../utils/request'
// 商品规格列表接口
export function getCationList(page,limit){
    return request({
        url:`/skus/${page}?limit=${limit}`,
        method:'GET',
        data:{
            page,
            limit
        }
    })
}
// 修改商品规格状态
export function getCationStatus(id,status){
    return request({
        url:`/skus/${id}/update_status`,
        method:'POST',
        data:{
            status
        }
    })
}

// 删除商品规格
export function getCationDelete(id){
    return request({
        url:`/skus/${id}/delete`,
        method:"POST",
    })
}

// 修改商品规格
export function getCationUpdate(data,id){
    return request({
        url:`/skus/${id}`,
        method:'POST',
        data
    })
}

// 新增商品规格
export function getCationAddData(data){
    return request({
        url:`/skus`,
        method:'POST',
        data
    })
}