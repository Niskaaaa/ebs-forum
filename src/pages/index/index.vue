<template>
<div>
<search  :barHeight="barHeight" ></search>
    <imooc-tabs :actvie="0">
    </imooc-tabs>
<articleList :content="lists" @click="test()"></articleList>
    <tab-bar :selected="0"></tab-bar>
</div>
</template>

<script>

import tabBar from '../../components/tabbar/index'
import articleList from '../../components/articleList/index'
import {
    request,
    axios
} from '@/utils/request'
import VantTabs from '@/components/tabbar/vant'
import search from '../../components/search/index'
import store from './store'
export default {
    data() {
        return {
            active: 0,
            activeTab: 0,
            value: '',
            catalog:'',
            barHeight: 0,
            isEnd:false,
            isRepeat:false,

            lists: [{
                    isEnd: '0',
                    reads: 7,
                    answer: 3,
                    status: 0,
                    isTop: '0',
                    sort: '0',
                    _id: '5dca7446ba723835b12f4c83',
                    title: 'test2',
                    catalog: 'ask',
                    content: 'mock',
                    tags: [],
                    uid: {
                        name: 'mock',
                        isVip: '0',

                    },
                    created: '2019-11-12 08:58:46'
                }, {
                    isEnd: '0',
                    reads: 7,
                    answer: 3,
                    status: 0,
                    isTop: '0',
                    sort: '0',
                    _id: '5dca7446ba723835b12f4c83',
                    title: 'test2',
                    catalog: 'share',
                    content: 'mock',
                    tags: [],
                    uid: {
                        name: 'mock',
                        isVip: '0',

                    },
                    created: '2019-11-12 08:58:46'
                },
                {
                    isEnd: '0',
                    reads: 7,
                    answer: 3,
                    status: 0,
                    isTop: '0',
                    sort: '0',
                    _id: '5dca7446ba723835b12f4c83',
                    title: 'test2',
                    catalog: 'discuss',
                    content: 'mock',
                    tags: [],
                    uid: {
                        name: 'mock',
                        isVip: '0',

                    },
                    created: '2019-11-12 08:58:46'
                },
                {
                    isEnd: '0',
                    reads: 7,
                    answer: 3,
                    status: 0,
                    isTop: '0',
                    sort: '0',
                    _id: '5dca7446ba723835b12f4c83',
                    title: 'test2',
                    catalog: 'ask',
                    content: 'mock',
                    tags: [],
                    uid: {
                        name: 'mock',
                        isVip: '0',

                    },
                    created: '2019-11-12 08:58:46'
                }

            ]

        }
    },
    computed:{
        catalog(){
            console.log(store.state.catalog)
            return store.state.catalog
        }

    },
    props: ['item'],
    components: {
        tabBar,
        'imooc-tabs': VantTabs,
        search,
        articleList
    },
    onLoad() {
        this.getBarHeight()
        this.test()

    },
    methods: {

        async test() {
            console.log('test')
            const result = await axios.get('/public/list ')
            console.log(result)
            this.lists=result
        },
        showUser(id) {
            console.log('showUser->id', id)
        },
        showDetail(id) {
            console.log('showDetail->id', id)
        },
        getBarHeight() {
            let statusBarHeight = 0
            wx.getSystemInfo({
                success: (result) => {
                    statusBarHeight = result.statusBarHeight
                    let isiOS = result.system.indexOf('iOS') > -1
                    console.log('getNavBarHeight -> isiOS', isiOS)
                    if (isiOS) {
                        this.barHeight = statusBarHeight + 5
                    } else {
                        this.barHeight = statusBarHeight + 7
                    }
                }

            })

        },
        _getList(){

        }

    },

}
</script>

<style lang="scss" scoped>


</style>
