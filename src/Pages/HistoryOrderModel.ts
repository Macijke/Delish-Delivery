export interface HistoryOrder {
    date: string;
    totalPrice: number;
    items: HistoryItem[];
}

export interface HistoryItem {
    name: string;
    price: number;
    products: string[];
    meat?: string;
    sauce?: string;
}