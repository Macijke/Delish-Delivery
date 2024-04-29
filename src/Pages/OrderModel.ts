export interface Item {
    restaurantId: string;
    foodId: string;
    price: number;
    status?: string;
    sauce?: string;
    meat?: string;
}

export interface Order {
    userId: string;
    items: Item[];
    totalPrice: number;
}

