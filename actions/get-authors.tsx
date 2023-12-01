import { Author } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/authors`;

const getAuthors = async (): Promise<Author[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getAuthors;