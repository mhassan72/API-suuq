import Product from '../model/Product'
export default class SearchService {

    private productModel: Product;
    
    constructor() {
        this.productModel = new Product();
    }

    async products(search_term: string) {
        if (!search_term) {
            throw new Error('Search term cannot be empty.');
        }

        // Scan the table and filter results locally for simplicity
        const allProducts = await this.productModel.all();
        const lowerCaseTerm = search_term.toLowerCase();

        // Filter products based on the search term
        const filteredProducts = allProducts.filter((product: Record<string, any>) => {
            const searchableFields = ['title', 'description']; // Fields to search in
            return searchableFields.some((field) =>
                product[field]?.toLowerCase().includes(lowerCaseTerm)
            );
        });

        return { search_term: search_term, filteredProducts: filteredProducts }
    }

}

export const searchService = new SearchService()