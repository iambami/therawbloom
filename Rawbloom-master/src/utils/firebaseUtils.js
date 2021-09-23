import firebase from "./firebase";

export function UploadImage(image, path) {
    return new Promise(async (resolve, reject) => {
        try {
            const StorageRef = firebase.storage().ref(path);
            await StorageRef.put(image);
            resolve(await StorageRef.getDownloadURL());
        } catch (err) {
            reject(err.message());
        }
    });
}
