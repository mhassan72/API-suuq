import Product from '../model/Product'
export default class SearchService {

    private productModel: Product;
    private static searchableFields = ['title', 'description', 'tags']; // Fields to search in
    
    constructor() {
        this.productModel = new Product();
    }

    async products(searchTerm: string): Promise<{ search_term: string; filteredProducts: any[] }> {
        const trimmedSearchTerm = this.validateSearchTerm(searchTerm);
        const allProducts = await this.fetchAllProducts();
        const scoredProducts = this.scoreAndSortProducts(allProducts, trimmedSearchTerm);
    
        return { search_term: trimmedSearchTerm, filteredProducts: scoredProducts };
    }

    private scoreAndSortProducts(products: any[], searchTerm: string): any[] {
        const scoredProducts = products.map((product) => ({
          ...product,
          score: this.calculateScore(product, searchTerm),
        }));
    
        // Sort by score in descending order
        return scoredProducts
          .filter((product) => product.score > 0) // Exclude products with no relevance
          .sort((a, b) => b.score - a.score);
    }

    private calculateScore(product: Record<string, any>, searchTerm: string): number {
        let score = 0;
    
        SearchService.searchableFields.forEach((field) => {
          if (field === 'tags' && Array.isArray(product[field])) {
            // Add score for tags that match the search term
            score += product[field].reduce((acc: number, tag: string) => {
              return acc + (tag.toLowerCase().includes(searchTerm) ? 1 : 0);
            }, 0);
          } else if (typeof product[field] === 'string') {
            // Add score for string fields that match the search term
            const fieldValue = product[field].toLowerCase();
            if (fieldValue.includes(searchTerm)) {
              score += this.calculateStringMatchScore(fieldValue, searchTerm);
            }
          }
        });
    
        return score;
    }

    private calculateStringMatchScore(fieldValue: string, searchTerm: string): number {
        const occurrences = fieldValue.split(searchTerm).length - 1; // Count occurrences of the search term
        return occurrences; // Each occurrence adds 1 point
    }

    private validateSearchTerm(searchTerm: string): string {
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) {
            throw new Error('Search term cannot be empty or whitespace only.');
        }

        return trimmedTerm.toLowerCase();
    }

    private async fetchAllProducts(): Promise<any[]> {
        try {
          return await this.productModel.all();
        } catch (error) {
          console.error('Error fetching products:', error);
          throw new Error('Failed to fetch products. Please try again later.');
        }
    }

    private filterProducts(products: any[], searchTerm: string): any[] {
        return products.filter((product: Record<string, any>) =>
          SearchService.searchableFields.some((field) => this.matchesSearchTerm(product, field, searchTerm))
        );
    }

    private matchesSearchTerm(product: Record<string, any>, field: string, searchTerm: string): boolean {
        if (field === 'tags' && Array.isArray(product[field])) {
          return product[field].some((tag: string) => tag.toLowerCase().includes(searchTerm));
        } else if (typeof product[field] === 'string') {
          return product[field].toLowerCase().includes(searchTerm);
        }
        return false;
      }

}

export const searchService = new SearchService()