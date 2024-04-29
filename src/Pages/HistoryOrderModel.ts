export interface HistoryOrder {
    _id: string;
    date: string;
    totalPrice: number;
    status: string;
    items: HistoryItem[];
}

export interface HistoryItem {
    name: string;
    price: number;
    products: string[];
    meat?: string;
    sauce?: string;
    images: string;
}