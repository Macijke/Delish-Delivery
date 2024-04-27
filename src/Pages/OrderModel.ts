export interface Item {
    restaurantId: string;
    foodId: string;
    sauce?: string;
    meat?: string;
    price: number;
}

export interface Order {
    userId: string;
    items: Item[];
    totalPrice: number;
}

