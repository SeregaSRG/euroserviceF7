<template>
    <div
            class="mf-button"
            @click.prevent="createAction"
            :class="{
                'mf-button--secondary': modifiers.indexOf('secondary') !== -1,
                'mf-button--rounded': modifiers.indexOf('rounded') !== -1,
                'mf-button--disabled': disabled
            }"
    >
        <p v-if="!isLoading">
            <slot></slot>
        </p>
        <div class="loading" v-else>
            <f7-preloader :size="32" color="white"></f7-preloader>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mfButton",
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            action: {
                type: Function,
                default: () => {
                    console.log('button-main')
                }
            },
            modifiers: {
                type: Array,
                default: () => {
                    return []
                }
            },
            disabled: {
                type: Boolean
            }
        },
        methods: {
            createAction () {
                if (!this.isLoading && !this.disabled) {
                    this.action()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mf-button {
        width: calc(100% - 10px);
        max-width: 328px;
        height: 46px;
        background: #58C2F1;
        border-radius: 8px;
        display: flex;
        margin: 0 auto;
        overflow: hidden;

        p {
            margin: auto;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            font-size: 18px;
            text-align: center;
            letter-spacing: 2px;
            color: #FFFFFF;
            text-transform: uppercase;
        }

        .loading {
            margin: auto;
            width: 32px;
            height: 32px;
        }

        &--secondary {
            background: #001B36;
        }

        &--disabled {
            background: #EAECF4;
        }

        &--rounded {
            border-radius: 23px;
        }
    }
</style>
