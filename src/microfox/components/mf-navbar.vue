<template>
    <div class="mf-navbar">
        <div class="mf-navbar__back-button" @click="$f7router.back()">
            <img src="../src/navbar/back.svg" alt="" class="mf-navbar__back-button-image">
        </div>
        <div class="mf-navbar__title">
            {{ title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "mf-navbar",
        props: {
            title: {
                type: String,
                require: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .mf-navbar {
        width: 100%;
        height: 100px;
        display: flex;

        &__back-button {
            position: absolute;
            left: 0;
            top: 0;
            width: 48px;
            height: 100px;
            display: flex;
            &-image {
                margin: auto;
                width: 16px;
            }
        }

        &__title {
            margin: auto;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 36px;
            /* identical to box height, or 180% */
            display: flex;
            align-items: center;

            color: #001B36;
        }
    }
</style>
