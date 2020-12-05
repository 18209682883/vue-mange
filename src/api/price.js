import request from '../utils/request'
// 获取相册列表
export function getPriceList(page, limit) {
    return request({
        url: `/imageclass/${page}?limit=${limit}`,
        method: 'get',
        data:{
            page,
            limit
        }
    })
}

// 获取相册图片列表
export function getImageList(id,page,limit,order,keyword){
    return request({
        url:`/imageclass/${id}/image/${page}?limit=${limit}`,
        method:'GET',
        data:{
            page,
            limit,
            order,
            keyword
        }
    })
}

// 修改相册名称
export function getUpdateList(id){
    return request({
        url:`/imageclass/${id}`,
        method:'POST',
        id
    })
}

// 删除相册图片
export function getDelImage(id){
    return request({
        url:`/image/${id}`,
        method:'DELETE',
    })
}

// 删除单个相册列表
export function getDeleteList(id){
    return request({
        url:`/imageclass/${id}`,
        method:'DELETE'
    })
}

// 修改相册列表
export function getUpdateData(id,name,order){
    return request({
        url:`/imageclass/${id}`,
        method:'POST',
        data:{
            name,
            order
        }
    })
}

// 上传图片
export function getUploadPrice(img,image_class_id){
    return request({
        url:'/image/upload',
        method:'POST',
        data:{
            img,
            image_class_id
        }
    })
}

// 增加相册分类
export function getAddPriceList(data){
    return request({
        url:`/imageclass`,
        method:'POST',
        data
    })
}