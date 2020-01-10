<template>
    <f7-page name="authUser" bg-color="white">
        <div class="header-background"></div>
        <div class="modal-panel">
            <p class="modal-panel__title">
                Регистрация
            </p>
            <p class="modal-panel__description">
                Введите номер Вашего мобильного телефона
            </p>
            <div class="phone-input__wrapper">
                <f7-input
                        type="select"
                        defaultValue="+7"
                        placeholder="Выберите код..."
                >
                    <option value="+7">+7</option>
                    <option value="+380">+380</option>
                </f7-input>
                <f7-input
                        type="tel"
                        placeholder=""
                        clear-button
                        maxlength="10"
                >
                </f7-input>
            </div>
            <mf-button
                :modifiers="['rounded']"
                :is-loading="status"
                :action="requestCode"
            >ДАЛЕЕ</mf-button>
        </div>
    </f7-page>
</template>

<script>
    export default {
        name: "authUser",
        data() {
            return {
                status: false
            }
        },
        methods: {
            requestCode () {
               this.status = true
               setTimeout(() => {
                   this.status = false
               }, 2000)
            }
        }
    }
</script>

<style scoped>
    .header-background {
        width: 100%;
        height: 146px;
        background-image: url("../../assets/auth/authUser.svg");
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
</style>
