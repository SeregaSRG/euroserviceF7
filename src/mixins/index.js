import Vue from 'vue'

Vue.mixin({
    methods: {
        navigatorPush: () => {
            console.log('123')
            // this.$f7router.navigate('/about/')
        },
        responseErrorHelper: (data, fieldServerName, appField, appErrors) => {
            if (Array.isArray(data)) {
                let errorField = data.find(serverField => {
                    if (typeof serverField.field !== 'undefined' && serverField.field === fieldServerName) {
                        return true
                    } else {
                        return false
                    }
                })
                if (errorField) {
                    if (appField) {
                        appErrors[appField] = errorField.message
                    } else {
                        this.$f7.dialog.alert(errorField.message,'Ошибка')
                    }
                } else {
                    appErrors[appField] = null
                }
            } else {
                appErrors[appField] = null
            }
        }
    }
})
