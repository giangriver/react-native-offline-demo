import NetInfo from "@react-native-community/netinfo";

export const NetworkAvailable = () => {
    NetInfo.fetch().then(state => {
        if (state.isConnected) {
            return true
        } else {
            return false
        }
    })
}