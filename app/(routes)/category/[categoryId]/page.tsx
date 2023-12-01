import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getAuthors from '@/actions/get-authors';
import getPublishers from '@/actions/get-publishers';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';


export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        publisherId: string;
        authorId: string;
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const authors = await getAuthors();
    const publishers = await getPublishers();
    const category = await getCategory(params.categoryId);

    const products = await getProducts({
        categoryId: params.categoryId,
        publisherId: searchParams.publisherId,
        authorId: searchParams.authorId,
    });

    return (
        <div className="bg-white">
            <Container>
                <Billboard
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters authors={authors} publishers={publishers} />
                        <div className="hidden lg:block">
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
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;