import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    // url: 'http://47.95.246.40:8080/',
    url: 'http://47.95.246.40:8080/',
    YYurl: 'http://47.95.246.40:8080/',
    // YYurl:'http://47.94.215.104:8082/',
    user: {
        isLogin: 0,
        Authorization: '',
        name: '',
        userName: '',
        id: '',
    },
    servers: [
        '请假销假',
        '信息收集',
        '领导围栏',
        '文件下载',
        '社团管理',
        '考试申请',
        '教学日历',
        '请假销假',
        '学分审核',
        '领导围栏',
        '文件下载',
        '教材使用',
        '课堂质量评价',
        '辅导员模块',
        '我要预约',
    ],
    leftNav: [
        {
            name: '信息收集',
            common: [
                {
                    title: '填写信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/getinformation/std_Getnformaition',
                },
            ],
            teacher: [
                {
                    title: '填写信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/getinformation/tch_Getnformaition',
                },
            ],
            admin: [
                {
                    title: '发布收集',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/getinformation/tch_release',
                },
                {
                    title: '填写信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/getinformation/admin_Getnformaition',
                },
                {
                    title: '信息管理',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/getinformation/tch_Administration',
                },
            ]
        },
        {
            name: '我要预约',
            common: [
                {
                    title: '我的预约',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/my',
                },
                {
                    title: '实验室预约',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/SYsteps',
                },
                {
                    title: '会议室预约',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/HYsteps',
                },
            ],
            admin: [
                {
                    title: '实验室管理',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/shiyanshi',
                },
                {
                    title: '会议室管理',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/huiyishi',
                },
                {
                    title: '实验室管理员',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/admin',
                },
                {
                    title: '会议室管理员',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_yuyue/Hadmin',
                },
            ]
        },
        {
            name: '文件下载',
            common: [
                {
                    title: '文件下载',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_wenjian/wenjian',
                },
            ],
            admin: [
                {
                    title: '文件下载',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/tch_wenjian/wenjian',
                },
            ]
        },
        {
            name: '人员信息管理',
            common: [
                {
                    title: '我的信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/information/std_information',
                },
            ],
            teacher: [
                {
                    title: '我的信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/information/tch_information',
                },
            ],
            admin: [
                {
                    title: '我的信息',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/information/admin_informaition',
                },
            ]
        },
        {
            name: '教学日历',
            common: [
                {
                    title: '日历更新',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_update',
                },
                {
                    title: '日历寻找',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_lookFor',
                },
                {
                    title: '日历考察',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_examine',
                },
            ],
            teacher: [
                {
                    title: '日历更新',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_update',
                },
                {
                    title: '日历寻找',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_lookFor',
                },
                {
                    title: '日历考察',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/tch_clendar_examine',
                },

            ],
            admin: [
                {
                    title: '日历模板',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/muban_update',
                },
                {
                    title: '日历管理',
                    iclass: 'icon iconfont icon-zhanghaoguanli',
                    path: '/clendar/admin_clendar',
                },

            ]
        },
    ],
    options: null,
    left_nav: [
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '我要请假',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '信息收集',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '计算机系领导',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '系办公室',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '系党委学生工作办公室',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '计算机科学与技术教研室',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '软件工程教研室',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '网络工程教研室',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '信息安全教研室',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '文件下载',
            },

        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '查看历史',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '提交计划',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '我要约考',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '教学日历',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '请假历史',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '请假',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '班主任审核',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '辅导员审核',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '特殊审核',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '文件上传',
            },
            // {
            //     iclass:'icon iconfont icon-zhanghaoguanli',
            //     title:'达标学生',
            // },
            // {
            //     iclass:'icon iconfont icon-zhanghaoguanli',
            //     title:'未达标学生',
            // },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '地图定位',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '文件下载',
            },

        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '本部教材',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '科院教材',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '课堂评价',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '班级管理',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '社团活动管理',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '社团人事管理',
            },
        ],
        [
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '实验室管理',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '预约进度',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '我的预约',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '实验室管理员',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '会议室管理员',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '会议室管理',
            },
            {
                iclass: 'icon iconfont icon-zhanghaoguanli',
                title: '会议室预约',
            },

        ],
    ],

    LDtable: [
        [
            {
                work: '',
                name: '',
                phone: '',
                address: '',
                position: '',
            },
            {
                work: '',
                name: '',
                phone: '',
                address: '',
                position: '',
            },
            {
                work: '',
                name: '',
                phone: '',
                address: '',
                position: '',
            },
            {
                work: '',
                name: '',
                phone: '',
                address: '',
                position: '',
            },
            {
                work: '',
                name: '',
                phone: '',
                address: '',
                position: '',
            },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
    ],
    router: [
        [

        ],
        [

        ],
        [
            '/std_lingdao/lingdao',
            '/std_lingdao/xiban',
            '/std_lingdao/xidang',
            '/std_lingdao/jisuan',
            '/std_lingdao/ruanjian',
            '/std_lingdao/wangluo',
            '/std_lingdao/xinxi',

        ],
        [

        ],
        [
            '/std_shetuan/shetuan',
            '/std_shetuan/add?text=0'
        ],
        [

        ],
        [

        ],
        [

        ],
        [
            '/tch_xuefen/xuefen'
        ],
        [

        ],
        [
            '/tch_wenjian/wenjian',
            '/tch_wenjian/shangchuan'
        ],
        [
            '/tch_jiaocai/jiaocai',
            '/tch_jiaocai/keyuan'
        ],
        [
            "/tch_ketang/ketang"
        ],
        [
            "/tch_fudaoyuan/fudaoyuan",
            "/tch_fudaoyuan/shetuan",
            "/tch_fudaoyuan/shetuanrenshi"
        ],
        [
            '/tch_yuyue/shiyanshi',
            // '/tch_yuyue/yeyue_manager',
            // '/tch_yuyue/kebiao',
            // '/tch_yuyue/xueqi',
            '/tch_yuyue/SYsteps',
            '/tch_yuyue/my',
            '/tch_yuyue/admin',
            '/tch_yuyue/Hadmin',
            '/tch_yuyue/huiyishi',
            '/tch_yuyue/HYsteps'
        ],
    ]
}
const mutations = {
    loginStatus(state, isLogin) {
        //  alert(islogin)   
        //界面登录状态
        if (isLogin == 0 || isLogin == null) {
            sessionStorage.setItem('isLogin', 0)
            sessionStorage.setItem('userName', '')
            sessionStorage.setItem('id', '')
            sessionStorage.setItem('name', '')
            sessionStorage.setItem('userType', '')
            sessionStorage.setItem('Authorization', '')
            state.user.isLogin = sessionStorage.getItem('isLogin')
            state.user.userName = sessionStorage.getItem('userName')
            state.user.id = sessionStorage.getItem('id')
            state.user.name = sessionStorage.getItem('name')
            state.user.userType = sessionStorage.getItem('userType')
            state.user.Authorization = sessionStorage.getItem('Authorization')
        }
        else if (isLogin == 1) {
            state.user.isLogin = sessionStorage.getItem('isLogin')
            state.user.userName = sessionStorage.getItem('userName')
            state.user.id = sessionStorage.getItem('id')
            state.user.name = sessionStorage.getItem('name')
            state.user.userType = sessionStorage.getItem('userType')
            state.user.Authorization = sessionStorage.getItem('Authorization')
        }
    },
    getOptions(state, data) {
        console.log(data)
        state.leftNav.forEach(element => {
            // console.log(element.name)
            // console.log(data[0])
            if (element.name == data[0]) {
                // if(data[1]=='common'){
                //     console.log(element.common)
                //     return element.common
                // }
                switch (data[1]) {
                    //判断人员的类型来选择左边栏的构建
                    case 'admin':
                        state.options = element.admin;
                        break;
                    case 'common':
                        state.options = element.common;
                        break;
                    case 'teacher':
                        state.options = element.teacher;
                        break;
                }
            }
        });
    }
}
export default new Vuex.Store({
    state,
    mutations
});