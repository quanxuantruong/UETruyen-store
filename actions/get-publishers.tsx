import { Publisher } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/publishers`;

const getPublishers = async (): Promise<Publisher[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getPublishers;