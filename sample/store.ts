import "text-encoding-polyfill"
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a Store class to store the authentication data. The following implementation 
// uses the async-storage.
export class LocalStorage {

    // Get the data from the store.
    async getData(key:string) {

        const _value = await AsyncStorage.getItem(key);
        return _value;
    }

    // Save the data into the store.
    async setData(key:string,value:string) {

        try {
            await AsyncStorage.setItem(key, value);
        }
        catch(error) {
            console.log(error);
        }
    }

    // Remove the data from the store.
    async removeData(key:string) {

        try {
            await AsyncStorage.removeItem(key);
        }
        catch(error) {
            console.log(error);
        }
    }
}
