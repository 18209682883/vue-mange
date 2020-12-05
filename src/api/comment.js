import request from '../utils/request'
// 商品评价列表
export function getCommentData(page,limit,title){
    return request({
        url:`/goods_comment/${page}?limit=${limit}`,
        method:'GET',
        data:{
            title
        }
    })
}

// 修改商品评价状态
export function getCommentStatus(id,status){
    return request({
        url:`/goods_comment/${id}/update_status`,
        method:'POST',
        data:{
            status
        }
    })
}