import Vue from 'vue'
import Router from 'vue-router'
import Inf from '@/components/page/Inf'
import Left_nav from '@/components/page/left_nav'
// import Top_nav from '@/components/page/top_nav'
import xuefen from '@/components/StudyScore/XFxuefen'
import lingdao from '@/components/Leader/LDweilan'
import wenjian from '@/components/File/WJxiazai'
import shangchuan from '@/components/File/WJshangchuan'
import WJstu from '@/components/File/WJstu'
import LDstu from '@/components/Leader/LDstu'
import LDadmin from '@/components/Leader/LDadmin'
import JCbenbu from '@/components/StudyBook/JCbenbu'
import JCkeyuan from '@/components/StudyBook/JCkeyuan'
import addJC from '@/components/StudyBook/add_jc'
import editJC from '@/components/StudyBook/edit_jc'
import addKJC from '@/components/StudyBook/add_Kjc'
import editKJC from '@/components/StudyBook/edit_Kjc'
import KTpingjia from '@/components/Assessment/KTpingjia'
import addKT from '@/components/Assessment/add_kt'
import editKT from '@/components/Assessment/edit_kt'
import FDbanganbu from '@/components/Instructor/FDbanganbu'
import FDshetuan from '@/components/Instructor/FDshetuan'
import addFDB from '@/components/Instructor/add_fdb'
import editFDB from '@/components/Instructor/edit_fdb'
import addFDS from '@/components/Instructor/add_fds'
import editFDS from '@/components/Instructor/edit_fds'
import addFDSR from '@/components/Instructor/add_fdsr'
import editFDSR from '@/components/Instructor/edit_fdsr'
import FDshetuanrenshi from '@/components/Instructor/FDshetuanrenshi'
import details from '@/components/page/details'
import SThis from '@/components/page/sthis'
import STadd from '@/components/page/stadd'
import YYshiyanshi from '@/components/order/YYshiyanshi'
import YYhuiyishi from '@/components/order/YYhuiyishi'
import YYshebei from '@/components/order/YYshebei'
import YYguanli from '@/components/order/YYguanli'
import YYkebiao from '@/components/order/YYkebiao'
import YYxueqi from '@/components/order/YYxueqi'
import YYSteps from '@/components/order/YYSteps'
import HYSteps from '@/components/order/YYHsteps'
import YYadmin from '@/components/order/YYadmin'
import YYHadmin from '@/components/order/YYHadmin'
import YYmy from '@/components/order/YYmy'
import AddYYS from '@/components/order/add_yyshi'
import AddYYH from '@/components/order/add_yyhui'
import error from '@/components/page/404.vue'


import login from '@/components/page/login'
import password from '@/components/page/password'
import information from '@/components/page/information'
import release from '@/components/page/release'
import guanli from '@/components/page/guanli'
import shouji from '@/components/page/shouji'
import rili from '@/components/page/rili'
import kaoshi from '@/components/page/kaoshi'
import tch_qingjia from '@/components/page/tch_qingjia'
import std_qingjia from '@/components/page/std_qingjia'
import gly_repassword from '@/components/page/gly_repassword'
import gly_addperson from '@/components/page/gly_addperson'
import gly_changeInf from '@/components/page/gly_changeInf'

const std_information = () => import('@/components/information/std_information')
const tch_information = () => import('@/components/information/tch_information')
const admin_informaition = () => import('@/components/information/admin')

const admin_Getnformaition = () => import('@/components/informationGathering/admin')
const std_Getnformaition = () => import('@/components/informationGathering/std_Inf_Get')
const tch_Getnformaition = () => import('@/components/informationGathering/tch_Inf_Get')
const tch_release = () => import('@/components/informationGathering/tch_release')
const tch_Administration = () => import('@/components/informationGathering/tch_Administration')

const tch_clendar_update = () => import('@/components/TeachingCalendar/tch_clendar_update')
const tch_clendar_lookFor = () => import('@/components/TeachingCalendar/tch_clendar_lookFor')
const tch_clendar_examine = () => import('@/components/TeachingCalendar/tch_clendar_examine')
const admin_clendar = () => import('@/components/TeachingCalendar/admin')
const muban_update = () => import('@/components/TeachingCalendar/muban_update')



Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Inf',
      component: Inf,
      // components: {
      //   //top_nav:Top_nav,
      //   main_inf:Inf,
      // },
    },
    // {
    //   path: '/details',
    //   name: 'details',
    //   component: details
    // },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/password',
      name: 'password',
      component: password,
    },
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/tch_guanli',
      component: Left_nav,
      children: [
        {
          path: 'guanli',
          component: guanli,
        }
      ],
    },
    // {
    //   path: '/tch_release',
    //   component: Left_nav,
    //   children: [
    //     {
    //       path: 'release',
    //       component: release,
    //     }
    //   ],
    // },
    {
      path: '/std_xinxi',
      component: Left_nav,
      children: [
        {
          path: 'shouji',
          component: shouji,
        }
      ],
    },
    {
      path: '/tch_rili',
      component: Left_nav,
      children: [
        {
          path: 'rili',
          component: rili,
        }
      ],
    },
    {
      path: '/tch_kaoshi',
      component: Left_nav,
      children: [
        {
          path: 'kaoshi',
          component: kaoshi,
        }
      ],
    },
    {
      path: '/tch_qingjia',
      component: Left_nav,
      children: [
        {
          path: 'tch_qingjia',
          component: tch_qingjia,
        }
      ],
    },
    {
      path: '/std_qingjia',
      component: Left_nav,
      children: [
        {
          path: 'std_qingjia',
          component: std_qingjia,
        }
      ],
    },
    {
      path: '/gly_repassword',
      name: 'gly_repassword',
      component: gly_repassword,
    },
    {
      path: '/gly_addperson',
      name: 'gly_addperson',
      component: gly_addperson,
    },
    {
      path: '/gly_changeInf',
      name: 'gly_changeInf',
      component: gly_changeInf,
    },
    //  {
    //    path:'/std_qingjia',
    //    components:{
    //     //top_nav:Top_nav,
    //     // left_nav:Left_nav,
    //     main_functon:xuefen,
    //     children:[
    //       {

    //       }
    //     ]
    //    }
    //  },
    //  {
    //   path:'/std_xinxi',
    //   components:{
    //    //top_nav:Top_nav,
    //    left_nav:Left_nav,
    //    children:[
    //      {

    //      }
    //    ]
    //   }
    // },
    {
      path: '/std_lingdao',
      component: Left_nav,
      children: [
        {
          path: 'lingdao',
          component: LDstu,
        },
        {
          path: 'xiban',
          component: LDstu,
        },
        {
          path: 'xidang',
          component: LDstu,
        },
        {
          path: 'jisuan',
          component: LDstu,
        },
        {
          path: 'ruanjian',
          component: LDstu,
        },
        {
          path: 'wangluo',
          component: LDstu,
        },
        {
          path: 'xinxi',
          component: LDstu,
        }
      ]
    },
    {
      path: '/std_lingdaoAdmin',
      component: Left_nav,
      children: [
        {
          path: 'lingdao',
          component: LDadmin,
        },
        {
          path: 'xiban',
          component: LDadmin,
        },
        {
          path: 'xidang',
          component: LDadmin,
        },
        {
          path: 'jisuan',
          component: LDadmin,
        },
        {
          path: 'ruanjian',
          component: LDadmin,
        },
        {
          path: 'wangluo',
          component: LDadmin,
        },
        {
          path: 'xinxi',
          component: LDadmin,
        }
      ]
    },
    {
      path: '/std_wenjian',
      component: Left_nav,
      children: [
        {
          path: 'wenjian',
          component: WJstu,
        }
      ]
    },
    {
      path: '/std_shetuan',
      component: Left_nav,
      children: [
        {
          path: 'shetuan',
          component: SThis,
        },
        {
          path: 'add',
          component: STadd,
        },
      ]
    },
    // {
    //   path:'/tch_kaoshi',
    //   components:{
    //    //top_nav:Top_nav,
    //    left_nav:Left_nav,
    //    children:[
    //      {

    //      }
    //    ]
    //   }
    // },
    // {
    //   path:'/tch_rili',
    //   components:{
    //    //top_nav:Top_nav,
    //    left_nav:Left_nav,
    //    children:[
    //      {

    //      }
    //    ]
    //   }
    // },
    // {
    //   path:'/tch_qingjia',
    //   components:{
    //    //top_nav:Top_nav,
    //    left_nav:Left_nav,
    //    children:[
    //      {

    //      }
    //    ]
    //   }
    // },
    // {
    //   path:'/tch_xuefen',
    //   components:{
    //    //top_nav:Top_nav,
    //    left_nav:Left_nav,

    //   },
    //   children:[
    //      {
    //        path:'xuefen',
    //        components:{
    //          main_functon:xuefen,
    //        }
    //      }
    //    ]
    // },
    {
      path: '/tch_xuefen',
      component: Left_nav,
      children: [
        {
          path: 'xuefen',
          component: xuefen,
        },
      ],
    },
    {
      path: '/tch_lingdao',
      component: Left_nav,
      children: [
        {
          path: 'lingdao',
          component: lingdao,
        }
      ]
    },
    {
      path: '/tch_wenjian',
      component: Left_nav,
      children: [
        {
          path: 'wenjian',
          component: wenjian,
        },
        {
          path: 'shangchuan',
          component: shangchuan,
        }
      ]
    },
    {
      path: '/tch_jiaocai',
      component: Left_nav,
      children: [
        {
          path: 'jiaocai',
          component: JCbenbu
        },
        {
          path: 'keyuan',
          component: JCkeyuan
        },
        {
          path: 'add',
          component: addJC
        },
        {
          path: 'edit',
          component: editJC
        },
        {
          path: 'addK',
          component: addKJC
        },
        {
          path: 'editK',
          component: editKJC
        }

      ]
    },
    {
      path: '/tch_ketang',
      component: Left_nav,
      children: [
        {
          path: 'ketang',
          component: KTpingjia
        },
        {
          path: 'add',
          component: addKT
        },
        {
          path: 'edit',
          component: editKT
        },
      ]
    },
    {
      path: '/tch_fudaoyuan',
      component: Left_nav,
      children: [
        {
          path: 'fudaoyuan',
          component: FDbanganbu,
        },
        {
          path: 'shetuan',
          component: FDshetuan
        },
        {
          path: 'add',
          component: addFDB,
        },
        {
          path: 'edit',
          component: editFDB,
        },
        {
          path: 'adds',
          component: addFDS,
        },
        {
          path: 'edits',
          component: editFDS,
        },
        {
          path: 'addsr',
          component: addFDSR,
        },
        {
          path: 'editsr',
          component: editFDSR,
        },
        {
          path: 'shetuanrenshi',
          component: FDshetuanrenshi,
        },
      ]
    },
    {
      path: '/tch_yuyue',
      component: Left_nav,
      children: [
        {
          path: 'yuyue',
        },
        {
          path: 'myYuyue',
        },
        {
          path: 'yeyue_manager',
          component: YYguanli,
        },
        {
          path: 'shiyanshi',
          component: YYshiyanshi,
        },
        {
          path: 'shebei',
          component: YYshebei
        },
        {
          path: 'kebiao',
          component: YYkebiao,
        },
        {
          path: 'xueqi',
          component: YYxueqi
        },
        {
          path: 'SYsteps',
          component: YYSteps
        },
        {
          path: 'admin',
          component: YYadmin
        },
        {
          path: 'Hadmin',
          component: YYHadmin
        },
        {
          path: 'my',
          component: YYmy
        },
        {
          path: 'add_shi',
          component: AddYYS
        },
        {
          path: 'add_hui',
          component: AddYYH
        },

        {
          path: 'huiyishi',
          component: YYhuiyishi
        },
        {
          path: 'HYsteps',
          component: HYSteps
        },










      ],
    },
    {
      path: '/404',
      component: error,
    },
    // {
    //   path: '/information',
    //   component: Left_nav,
    //   children: [
    {
      path: '/std_information',
      component: std_information,
      name: 'std_information',
    },
    {
      path: '/tch_information',
      component: tch_information,
      name: 'tch_information',
    },
    {
      path: '/admin_information',
      component: admin_informaition,
      name: 'admin_informaition',
    },
    //   ]
    // },
    {
      path: '/getinformation',
      component: Left_nav,
      children: [
        {
          path: 'admin_Getnformaition',
          component: admin_Getnformaition,
          name: 'admin_Getnformaition',
        },
        {
          path: 'std_Getnformaition',
          component: std_Getnformaition,
          name: 'std_Getnformaition',
        },
        {
          path: 'tch_Getnformaition',
          component: tch_Getnformaition,
          name: 'tch_Getnformaition',
        },
        {
          path: 'tch_release',
          component: tch_release,
          name: 'tch_release',
        },
        {
          path: 'tch_Administration',
          component: tch_Administration,
          name: 'tch_Administration',
        },
      ]
    },

    {
      path: '/clendar',
      component: Left_nav,
      children: [
        {
          path: 'tch_clendar_update',
          component: tch_clendar_update,
          name: 'tch_clendar_update',
        },
        {
          path: 'tch_clendar_lookFor',
          component: tch_clendar_lookFor,
          name: 'tch_clendar_lookFor',
        },
        {
          path: 'tch_clendar_examine',
          component: tch_clendar_examine,
          name: 'tch_clendar_examine',
        },
        {
          path: 'admin_clendar',
          component: admin_clendar,
          name: 'admin_clendar',
        },
        {
          path: 'muban_update',
          component: muban_update,
          name: 'muban_update',
        },
      ]
    },


  ]
}
)
