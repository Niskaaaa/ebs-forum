<template>
<div>
<search></search>
    <imooc-tabs :actvie="0">
    </imooc-tabs>
    <ul class="list">
        <li v-for="(item,index) in lists" :key="index" class="list-box" @click="showDetail(item._id)">
            <div class="list-head">
                <div class="title">
                    <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog==='share'">分享</span>
                    <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog==='ask'">提问</span>
                    <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog==='discuss'">分享</span>
                    <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog==='advice'">建议</span>
                    <span class="ellipsis">{{item.title}}</span>
                </div>
            </div>
            <div class="author">
                <div class="inline-block" @click.stop="showUser(item.uid._id)">
                    <img class="head" :src="item.uid.pic || '/img/bear-200-200.jpg'" alt />
                    <span class="name">{{item.uid.name || '未知用户'}}</span>
                    <i class="vip" v-show="item.uid.isVip !== '0'">VIP{{item.uid.isVip}}</i>
                </div>
            </div>
            <div class="list-body">
                <div class="info">{{item.content}}</div>
                <img class="fmt" :src="item.snapshot" v-show="item.snapshot" />
            </div>
            <div class="list-footer">
                <div class="left">
                    <span class="reply-num">{{item.answer}} 回复</span>
                    <span class="timer">{{item.created}}</span>
                </div>
            </div>
        </li>
    </ul>
    <tab-bar :selected="0"></tab-bar>
</div>
</template>

<script>
import tabBar from '../../components/tabbar/index'
import {
    request,
    axios
} from '@/utils/request'
import VantTabs from '@/components/tabbar/vant'
import search from '../../components/search/index'
export default {
    data() {
        return {
            active: 0,
            activeTab: 0,
            value: '',
            barHeight: 0,

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
    props: ['item'],
    components: {
        tabBar,
        'imooc-tabs': VantTabs,
        search,
    },
    onLoad() {
        this.getBarHeight()

    },
    methods: {

        async test() {
            console.log('test')
            const result = await axios.get('/adp/newitem/')
            console.log(result)
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

        }

    },

}
</script>

<style lang="scss" scoped>


li {
    list-style: none;
}

.list-box {
    padding: 30px 30px;
    background-color: #fff;
    margin-bottom: 20px;
}

.list-head {
    /*  display: flex;
  align-items: center; */
    margin-bottom: 18px;

    .type {
        display: inline-block;
        height: 36px;
        width: 72px;
        text-align: center;
        line-height: 36px;
        white-space: nowrap;
        margin-right: 10px;
        font-size: 24px;
        border-radius: 18px;
        border-bottom-left-radius: 0;
        color: #fff;
    }

    .type-share {
        background-color: #feb21e;
    }

    .type-ask {
        background-color: #02d199;
    }

    .type-discuss {
        background-color: #fe1e1e;
    }

    .type-advise {
        background-color: #0166f8;
    }

    .title {
        color: #333;
        font-size: 32px;
        line-height: 44px;
        font-weight: bold;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .type {
            min-width: 40px;
            transform: scale(0.9);
            position: relative;
            top: -1px;
        }
    }
}

.author {
    display: flex;
    align-items: center;
    font-size: 24px;
    margin-right: 30px;
    margin-bottom: 18px;
    color: #666;

    .head {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
        vertical-align: middle;
        position: relative;
        top: -4px;
    }
}

.list {
    zoom: 0.5;
    background: #F5F6F7;
}

.list-body {
    margin-bottom: 30px;
    display: flex;

    .info {
        font-size: 28px;
        color: #666;
        max-height: 94px;
        flex: 1;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .fmt {
        width: 192px;
        height: 122px;
        border-radius: 8px;
    }
}

.list-footer {
    color: #999;
    font-size: 24px;
    display: flex;
    align-items: center;

    .left {
        flex: 1;
        display: flex;
        align-items: center;

        .svg-icon {
            margin-right: 5px;
        }

        .timer {
            margin-left: 20px;
        }
    }
}
</style>
