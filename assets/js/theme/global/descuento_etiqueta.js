export default function updateDiscountPercentages() {
    const discountElements = document.querySelectorAll(".discount-percentage");

    discountElements.forEach(function (el) {
        const nonSalePrice = parseFloat(el.dataset.nonSalePrice);
        const salePrice = parseFloat(el.dataset.salePrice);

        if (!isNaN(nonSalePrice) && !isNaN(salePrice)) {
            if (nonSalePrice > salePrice) {
                const discount = Math.round(((nonSalePrice - salePrice) / nonSalePrice) * 100);
                el.textContent = `-${discount}%`;
            } else {
                el.textContent = '¡Oferta!';
            }
        } else {
            el.textContent = '¡Oferta!';
        }
    });
}
