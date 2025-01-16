import HostingStorage from "../lib/storage/HostingStorage";

export default class StorageProvider {

    private static hostingStorage: HostingStorage | null = null;

    public static provideHostingStorage() {
        if(this.hostingStorage === null) {
            this.hostingStorage = new HostingStorage('http://gebeya.alwaysdata.net/');
        }
        return this.hostingStorage;
    }
}