import Mock from 'mockjs';
import {homeData, homeBanner, issue, issues, records} from './home';


Mock.mock('/api/getHomeData', 'get', homeData);
Mock.mock('/api/getHomeBanner', 'get', homeBanner);

Mock.mock('/api/getCityData', 'get', {
    data: [
        {
            id: 1,
            name: '北京',
            children: [
                {
                    pid: 1,
                    name: "东城区"
                },
                {
                    pid: 1,
                    name:"西城区"
                },
                {
                    pid: 1,
                    name:"崇文区"
                },
                {
                    pid: 1,
                    name:"宣武区"
                },
                {
                    pid: 1,
                    name:"朝阳区"
                },
                {
                    pid: 1,
                    name:"丰台区"
                },
                {
                    pid: 1,
                    name:"石景山区"
                },
                {
                    pid: 1,
                    name:"海淀区"
                },
                {
                    pid: 1,
                    name:"门头沟区"
                },
                {
                    pid: 1,
                    name:"房山区"
                },
                {
                    pid: 1,
                    name:"通州区"
                },
                {
                    pid: 1,
                    name:"顺义区"
                },
                {
                    pid: 1,
                    name:"昌平区"
                },
                {
                    pid: 1,
                    name:"大兴区"
                },
                {
                    pid: 1,
                    name:"平谷区"
                },
                {
                    pid: 1,
                    name:"怀柔区"
                },
                {
                    pid: 1,
                    name:"密云县"
                },
                {
                    pid: 1,
                    name:"延庆县"
                }
            ]
        },
        {
            id: 2,
            name: '天津',
            children: [
                {
                    pid: 2,
                    name:"和平区"
                },
                {
                    pid: 2,
                    name:"河东区"
                },
                {
                    pid: 2,
                    name:"河西区"
                },
                {
                    pid: 2,
                    name:"南开区"
                },
                {
                    pid: 2,
                    name:"河北区"
                },
                {
                    pid: 2,
                    name:"红桥区"
                },
                {
                    pid: 2,
                    name:"塘沽区"
                },
                {
                    pid: 2,
                    name:"汉沽区"
                },
                {
                    pid: 2,
                    name:"大港区"
                },
                {
                    pid: 2,
                    name:"东丽区"
                },
                {
                    pid: 2,
                    name:"西青区"
                },
                {
                    pid: 2,
                    name:"津南区"
                },
                {
                    pid: 2,
                    name:"北辰区"
                },
                {
                    pid: 2,
                    name:"武清区"
                },
                {
                    pid: 2,
                    name:"宝坻区"
                },
                {
                    pid: 2,
                    name:"宁河县"
                },
                {
                    pid: 2,
                    name:"静海县"
                },
                {
                    pid: 2,
                    name:"蓟 县"
                }
            ]
        },
        {
            id: 3,
            name: '河北',
            children: [
                {
                    pid: 3,
                    "name": "石家庄"
                },
                {
                    pid: 3,
                    "name": "唐山"
                },
                {
                    pid: 3,
                    "name": "秦皇岛"
                },
                {
                    pid: 3,
                    "name": "邯郸"
                },
                {
                    pid: 3,
                    "name": "邢台"
                },
                {
                    pid: 3,
                    "name": "保定"
                },
                {
                    pid: 3,
                    "name": "张家口"
                },
                {
                    pid: 3,
                    "name": "承德"
                },
                {
                    pid: 3,
                    "name": "沧州"
                },
                {
                    pid: 3,
                    "name": "廊坊"
                },
                {
                    pid: 3,
                    "name": "衡水"
                }
            ]
        }
    ]
});

Mock.mock('/api/getIssueDetail', 'get', issue);


Mock.mock(/\/api\/getDataByCate[\s\S]*?/, 'get', (e) => {
    const cateId = e.url.match(/.*cateId=(.*)/)[1];
    switch (parseInt(cateId)) {
        case 1:
            return issues();
            break;
        case 2:
            return records();
            break;
    }
});
