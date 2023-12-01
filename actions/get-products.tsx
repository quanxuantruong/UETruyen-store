import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    publisherId?: string;
    authorId?: string;
    searchValue?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            publisherId: query.publisherId,
            authorId: query.authorId,
            categoryId: query.categoryId,
            searchValue: query.searchValue,
            isFeatured: query.isFeatured,
        },
    });

    const res = await fetch(url);

    return res.json();
};

export default getProducts;