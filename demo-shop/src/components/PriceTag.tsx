import { formatPrice } from "@/lib/db/format";

interface PriceTagProps {
    price: number,
    className?: String,
    locale?: string;
}

export default function PriceTag({price, className, locale} : PriceTagProps) {
    return <span className={`badge badge-primary badge-outline badge-lg ${className}`}>{formatPrice(price, locale)}</span>
}