export const seoKeywords = {
  primary: [
    "vending machines California",
    "vending machines modesto",
    "vending machines near me",
    "vending machine services",
    "workplace vending solutions",
    "Modesto vending machines",
    "Central Valley vending",
    "professional vending service",
  ],

  location: [
    "Modesto CA vending",
    "Stockton vending machines",
    "Fresno workplace solutions",
    "Sacramento vending service",
    "Central California vending",
    "Central Valley vending",
  ],

  technology: [
    "touchscreen vending machines",
    "contactless payment vending",
    "21.5 inch touchscreen vending",
    "smart vending technology",
    "modern vending solutions",
  ],

  business: [
    "office break room solutions",
    "workplace refreshment services",
    "employee satisfaction vending",
    "corporate vending programs",
    "business vending solutions",
  ],

  products: [
    "beverage vending machines",
    "snack vending solutions",
    "healthy vending options",
    "refrigerated vending machines",
    "combo vending machines",
  ],
};

// Get keywords for specific page types
export function getPageKeywords(pageType: string): string[] {
  const baseKeywords = [...seoKeywords.primary, ...seoKeywords.location];

  switch (pageType) {
    case "home":
      return [
        ...baseKeywords,
        ...seoKeywords.technology,
        ...seoKeywords.business,
      ];
    case "machines":
      return [
        ...baseKeywords,
        ...seoKeywords.technology,
        ...seoKeywords.products,
      ];
    case "contact":
      return [...baseKeywords, ...seoKeywords.business];
    case "product":
      return [
        ...baseKeywords,
        ...seoKeywords.products,
        ...seoKeywords.technology,
      ];
    default:
      return [...seoKeywords.primary, ...seoKeywords.location];
  }
}
