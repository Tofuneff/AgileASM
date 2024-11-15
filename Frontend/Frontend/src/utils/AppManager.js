import AsyncStorage from "@react-native-async-storage/async-storage";

class AppManager {
    constructor() {
        if (!AppManager.instance) {
            this.currentUser = null
            AppManager.instance = this;
        }
        return AppManager.instance;
    }

    static shared = new AppManager();

    setCurrentUser(user) {
        this.currentUser = user;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    // Remember login
    async saveRememberLogin(emailOrPhone, password) {
        try {
            await AsyncStorage.setItem('emailOrPhone', emailOrPhone);
            await AsyncStorage.setItem('rememberAcc', 'true');
            await AsyncStorage.setItem('password', password);
        } catch (error) {
            console.log('Lỗi: ', error);
        }
    }

    async getLoginData() {
        try {
            const savedEmail = await AsyncStorage.getItem('emailOrPhone');
            const savedPassword = await AsyncStorage.getItem('password');
            const savedRememberAcc = await AsyncStorage.getItem('rememberAcc') === 'true';
            
            return {
                emailOrPhone: savedEmail || '',
                password: savedPassword || '',
                rememberAcc: savedRememberAcc
            };
        } catch (error) {
            console.log('Lỗi: ', error);
            return {
                emailOrPhone: '',
                password: '',
                rememberAcc: false
            };
        }
    }

    async clearLoginData() {
        try {
            await AsyncStorage.removeItem('emailOrPhone');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.setItem('rememberAcc', 'false');
        } catch (error) {
            console.log('Lỗi: ', error);
        }
    }
}


export default AppManager;