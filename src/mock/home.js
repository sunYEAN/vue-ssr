import Mock from 'mockjs';

const img = Mock.Random.image('200x160');

const end = ({code = 200, message = '获取成功', data}) => {
    return {
        code,
        data,
        message,
    }
};
export const homeData = () => {
    return Mock.mock({
        code: 200,
        message: "获取成功",
        'data|10-100': [{
            'id|+1': 1,
            'views': Mock.Random.integer(100, 999),
            'title': '@cparagraph(1, 5)',
            'desc': '@cparagraph(1, 5)',
            'layout|1': [0, 1, 2],
            'poster|1': [
                [img],
                [img, img, img],
                []
            ],
            'edit_time': '@date',
            'update_time': '@date',
            'cate': 'javascript',
            'tags': ['都市', '霸道总裁']
        }]
    })
};

export const homeBanner = () => {
    return end({
        data: Array.from(new Array(5), (item, index) => Mock.mock({
            cover: Mock.Random.image('375x220')
        }))
    })
};

