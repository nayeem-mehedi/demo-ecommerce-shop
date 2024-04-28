export function formatPrice(price: number, locale?: string): string {
    // If locale is not provided, use the default locale
    if (!locale) {
        locale = 'en-US';
    }

    // Determine currency based on locale
    let currency: string;
    switch (locale) {
        case 'en-CA':
        case 'fr-CA':
            currency = 'CAD';
            break;
        default:
            currency = 'USD';
            break;
    }
    
    // Format the price using the provided locale
    return price.toLocaleString(locale, { style: 'currency', currency: currency });
}