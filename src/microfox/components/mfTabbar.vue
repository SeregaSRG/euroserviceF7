<template>
    <div class="mf-tabbar"
         :style="(pageHeight) ? { height: pageHeight } : {}"
    >
        <div class="mf-tabbar__bar">
            <div
                    v-for="(tab, $index) in tabs"
                    :key="tab.name"
                    class="mf-tabbar__bar-button"
                    :class="{ 'mf-tabbar__bar-button--active': $index === currentTab }"
                    @click="currentTab = $index"
            >
                <p>{{ tab.name }}</p>
            </div>
            <div class="mf-tabbar__bar-highlight"
                :style="highlightStyle"
            ></div>
        </div>
        <div class="mf-tabbar__page">
            <keep-alive>
                <component :is="tabs[currentTab].page"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mfTabbar",
        props: {
            tabs: {
                type: Array,
                require: true
            },
            height: {
                type: Number,
                default: null
            }
        },
        data () {
            return {
                currentTab: 0
            }
        },
        computed: {
            pageHeight () {
                return this.height ? this.height + 'px' : '100%'
            },
            highlightStyle () {
                return {
                    width: `calc((100% / ${this.tabs.length}) - 16px)`,
                    left: `calc(8px + ((100% / ${this.tabs.length}) * ${this.currentTab}))`
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .mf-tabbar {
        width: 100%;
        display: flex;
        flex-direction: column;

        &__bar {
            height: 48px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            position: relative;
            flex-shrink: 0;
            &-button {
                height: 48px;
                width: 100%;
                display: flex;
                p {
                    margin: auto;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 22px;
                    /* or 157% */
                    display: flex;
                    align-items: center;
                    text-align: center;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #001B36;
                }
            }

            &-highlight {
                height: 2px;
                background: #58C2F1;
                position: absolute;
                bottom: -1px;
                transition: .3s;
            }
        }
        .mf-tabbar__page{
            flex-grow:1;
            overflow-y:auto;
        }
    }
</style>
