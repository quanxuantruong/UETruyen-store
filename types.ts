export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    price: string;
    isFeatured: boolean;
    author: Author;
    publisher: Publisher;
    images: Image[]
};

export interface Image {
    id: string;
    url: string;
}

export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
};

export interface Publisher {
    id: string;
    name: string;
};

export interface Author {
    id: string;
    name: string;
};