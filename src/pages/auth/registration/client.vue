<template>
    <div class="client-registration">
        <div class="input__wrapper">
            <mf-input
                :placeholder="'Номер Вашего мобильного телефона'"
                :value.sync="credentials.phone"
                :type="'tel'"
            ></mf-input>
            <mf-input
                :placeholder="'Наименование организации'"
                :value.sync="credentials.organization"
            ></mf-input>
            <mf-input
                :placeholder="'Контактное лицо'"
                :value.sync="credentials.contact"
            ></mf-input>
            <mf-input
                :placeholder="'E-mail адрес'"
                :value.sync="credentials.email"
                :type="'email'"
            ></mf-input>
        </div>
        <mf-button
            :disabled="true"
        >Отправить</mf-button>
    </div>
</template>

<script>
    export default {
        name: "client",
        data () {
            return {
                credentials: {
                    phone: null,
                    organization: null,
                    contact: null,
                    email: null
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "registration";
</style>
