import getPublishers from "@/actions/get-publishers";
import getProducts from "@/actions/get-products";
import getAuthors from "@/actions/get-authors";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

interface FilterPropsPage {
    params: {
        searchString: string;
    },
    searchParams: {
        publisherId: string;
        authorId: string;
        categoryId: string;
    }
}

const FilterPage = async ({
    params, searchParams
}: FilterPropsPage) => {

    const products = await getProducts({
        searchValue: params.searchString,
        publisherId: searchParams.publisherId,
        authorId: searchParams.authorId,
        categoryId: searchParams.categoryId
    });

    const authors = await getAuthors();
    const publishers = await getPublishers();
    const categories = await getCategories();

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-10 px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters
                            authors={authors}
                            publishers={publishers}
                            categories={categories}
                        />
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="categoryId"
                                name="Categories"
                                data={categories}
                            />
                            <Filter
                                valueKey="authorId"
                                name="Authors"
                                data={authors}
                            />
                            <Filter
                                valueKey="publisherId"
                                name="Publishers"
                                data={publishers}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default FilterPage;