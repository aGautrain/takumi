import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AddressHistoryService {

    private STORAGE_KEY = 'takumi_addresses';
    private STORAGE_KEY_LAST = 'takumi_last_address';

    putAddress(address: string): void {
        const history = this.getAddresses();
        if (!history.includes(address)) localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...history, address]));
        localStorage.setItem(this.STORAGE_KEY_LAST, address);
    }

    getAddresses(): string[] {
        const history = localStorage.getItem(this.STORAGE_KEY);
        if (history) return JSON.parse(history);
        else return [];
    }

    getLastAddress(): string {
        return localStorage.getItem(this.STORAGE_KEY_LAST) || '';
    }

}