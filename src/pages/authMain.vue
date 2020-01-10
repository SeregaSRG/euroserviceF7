<template>
    <f7-page name="form" bg-color="white">
        <div class="auth__logo">
            <img class="auth__logo-image" src="../assets/mainLogo.png">
        </div>
        <h2 class="auth__proposal">Войти как:</h2>
        <div class="buttons__wrapper">
            <a href="/auth/login/client">
                <div class="button-auth">
                    <img src="../assets/auth/userButton.png">
                </div>
            </a>
            <a href="/auth/login/executor">
            <div class="button-auth">
                <img src="../assets/auth/executorButton.png">
            </div>
            </a>
        </div>
        <mf-button :action="toRegistration">РЕГИСТРАЦИЯ</mf-button>
    </f7-page>
</template>

<script>
    export default {
        name: "authMain",
        methods: {
            toRegistration () {
                this.$f7router.navigate('/auth/registration')
            }
        }
    }
</script>

<style scoped lang="scss">
    .auth__logo {
        margin: 0 auto;
        padding-top: 26px;
        width: 160px;

        &-image {
            width: 100%;
        }
    }

    .auth__proposal {
        margin: 46px 0 0 0;
        font-family: Roboto;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #000000;
    }

    .buttons__wrapper {
        padding: 20px 5px 26px;
        max-width: 320px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;

        .button-auth {
            width: 150px;
            height: 150px;

            img {
                width: 100%;
            }
        }
    }
</style>
