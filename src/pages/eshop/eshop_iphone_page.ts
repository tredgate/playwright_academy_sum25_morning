import { expect, Locator, Page, test } from "@playwright/test";

export class EshopIphonePage {
  readonly page: Page;

  // Breadcrumb
  readonly breadcrumb: Locator;
  readonly breadcrumbHome: Locator;
  readonly breadcrumbIphone: Locator;

  // Product images
  readonly mainProductImage: Locator;
  readonly additionalImages: Locator;
  readonly productImageThumbnails: Locator;

  // Product information
  readonly productTitle: Locator;
  readonly productBrand: Locator;
  readonly productCode: Locator;
  readonly productAvailability: Locator;
  readonly productPrice: Locator;
  readonly productExTaxPrice: Locator;

  // Product purchase section
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly wishListButton: Locator;
  readonly compareButton: Locator;

  // Product tabs
  readonly descriptionTab: Locator;
  readonly reviewsTab: Locator;
  readonly productDescription: Locator;
  readonly reviewSection: Locator;

  // Product rating
  readonly ratingSection: Locator;
  readonly ratingStars: Locator;
  readonly reviewsLink: Locator;
  readonly writeReviewLink: Locator;

  // Related products
  readonly relatedProductsTitle: Locator;
  readonly relatedProducts: Locator;

  // Header elements (inherited from homepage)
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly cartButton: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.breadcrumb = page.locator(".breadcrumb");
    this.breadcrumbHome = this.breadcrumb.locator("a:has(i.fa-home)");
    this.breadcrumbIphone = this.breadcrumb.locator('a:has-text("iPhone")');

    // Product images
    this.mainProductImage = page.locator(
      ".thumbnails li:first-child .thumbnail img"
    );
    this.additionalImages = page.locator(".image-additional .thumbnail img");
    this.productImageThumbnails = page.locator(".thumbnails li");

    // Product information
    this.productTitle = page.locator('h1:has-text("iPhone")');
    this.productBrand = page.locator('li:has-text("Brand:")');
    this.productCode = page.locator('li:has-text("Product Code:")');
    this.productAvailability = page.locator('li:has-text("Availability:")');
    this.productPrice = page.locator('h2:has-text("$101.00")');
    this.productExTaxPrice = page.locator('li:has-text("Ex Tax:")');

    // Product purchase section
    this.quantityInput = page.locator("#input-quantity");
    this.addToCartButton = page.locator("#button-cart");
    this.wishListButton = page.locator(
      ".btn-group button[onclick*=\"wishlist.add('40')\"]"
    );
    this.compareButton = page.locator(
      ".btn-group button[onclick*=\"compare.add('40')\"]"
    );

    // Product tabs
    this.descriptionTab = page.locator('a[href="#tab-description"]');
    this.reviewsTab = page.locator('a[href="#tab-review"]');
    this.productDescription = page.locator("#tab-description");
    this.reviewSection = page.locator("#tab-review");

    // Product rating
    this.ratingSection = page.locator(".rating");
    this.ratingStars = page.locator(".rating .fa-stack");
    this.reviewsLink = page.locator('.rating a:has-text("0 reviews")');
    this.writeReviewLink = page.locator('.rating a:has-text("Write a review")');

    // Related products
    this.relatedProductsTitle = page.locator('h3:has-text("Related Products")');
    this.relatedProducts = page.locator(".product-thumb");

    // Header elements
    this.logo = page.locator("#logo img");
    this.searchInput = page.locator('input[name="search"]');
    this.cartButton = page.locator("#cart");

    // Footer
    this.footer = page.locator("footer");
  }

  async validateProductStructure(): Promise<this> {
    await test.step("Validate iPhone product page structure", async () => {
      // Breadcrumb validation
      await expect(this.breadcrumb, "Breadcrumb is visible").toBeVisible();
      await expect(
        this.breadcrumbHome,
        "Breadcrumb home link is visible"
      ).toBeVisible();
      await expect(
        this.breadcrumbIphone,
        "Breadcrumb iPhone link is visible"
      ).toBeVisible();

      // Product information validation
      await expect(this.productTitle, "Product title is visible").toBeVisible();
      await expect(
        this.productTitle,
        "Product title has correct text"
      ).toHaveText("iPhone");
      await expect(this.productBrand, "Product brand is visible").toBeVisible();
      await expect(this.productCode, "Product code is visible").toBeVisible();
      await expect(
        this.productAvailability,
        "Product availability is visible"
      ).toBeVisible();
      await expect(this.productPrice, "Product price is visible").toBeVisible();

      // Product images validation
      await expect(
        this.mainProductImage,
        "Main product image is visible"
      ).toBeVisible();
      await expect(
        this.additionalImages.first(),
        "Additional images are visible"
      ).toBeVisible();

      // Purchase section validation
      await expect(
        this.quantityInput,
        "Quantity input is visible"
      ).toBeVisible();
      await expect(
        this.addToCartButton,
        "Add to cart button is visible"
      ).toBeVisible();
      await expect(
        this.wishListButton,
        "Wishlist button is visible"
      ).toBeVisible();
      await expect(
        this.compareButton,
        "Compare button is visible"
      ).toBeVisible();

      // Tabs validation
      await expect(
        this.descriptionTab,
        "Description tab is visible"
      ).toBeVisible();
      await expect(this.reviewsTab, "Reviews tab is visible").toBeVisible();
    });
    return this;
  }

  async validateProductContent(): Promise<this> {
    await test.step("Validate iPhone product content", async () => {
      // Brand validation
      await expect(this.productBrand, "Brand contains Apple").toContainText(
        "Apple"
      );

      // Product code validation
      await expect(
        this.productCode,
        "Product code contains 'product 11'"
      ).toContainText("product 11");

      // Availability validation
      await expect(
        this.productAvailability,
        "Product is in stock"
      ).toContainText("In Stock");

      // Price validation
      await expect(this.productPrice, "Price is $101.00").toHaveText("$101.00");
      await expect(
        this.productExTaxPrice,
        "Ex Tax price is correct"
      ).toContainText("Ex Tax: $101.00");

      // Quantity default value validation
      await expect(this.quantityInput, "Default quantity is 1").toHaveValue(
        "1"
      );

      // Button text validation
      await expect(
        this.addToCartButton,
        "Add to cart button has correct text"
      ).toHaveText("Add to Cart");
    });
    return this;
  }

  async validateProductDescription(): Promise<this> {
    await test.step("Validate product description", async () => {
      // Click on description tab (should be active by default)
      await this.descriptionTab.click();

      // Validate description content
      await expect(
        this.productDescription,
        "Product description is visible"
      ).toBeVisible();
      await expect(
        this.productDescription,
        "Description contains expected text"
      ).toContainText(
        "iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a name or number"
      );
    });
    return this;
  }

  async validateReviewsSection(): Promise<this> {
    await test.step("Validate reviews section", async () => {
      // Click on reviews tab
      await this.reviewsTab.click();

      // Validate reviews content
      await expect(
        this.reviewSection,
        "Reviews section is visible"
      ).toBeVisible();
      await expect(
        this.reviewSection,
        "No reviews message is displayed"
      ).toContainText("There are no reviews for this product");
      await expect(
        this.reviewSection,
        "Write a review section is visible"
      ).toContainText("Write a review");
    });
    return this;
  }

  async validateRelatedProducts(): Promise<this> {
    await test.step("Validate related products section", async () => {
      await expect(
        this.relatedProductsTitle,
        "Related products title is visible"
      ).toBeVisible();
      await expect(
        this.relatedProductsTitle,
        "Related products title has correct text"
      ).toHaveText("Related Products");
      await expect(
        this.relatedProducts.first(),
        "At least one related product is visible"
      ).toBeVisible();
    });
    return this;
  }

  async changeQuantity(quantity: string): Promise<this> {
    await test.step(`Change quantity to ${quantity}`, async () => {
      await this.quantityInput.clear();
      await this.quantityInput.fill(quantity);
    });
    return this;
  }

  async addToCart(): Promise<this> {
    await test.step("Add product to cart", async () => {
      await this.addToCartButton.click();
      // Wait for the success message or cart update
      await this.page.waitForTimeout(1000);
    });
    return this;
  }

  async addToWishlist(): Promise<this> {
    await test.step("Add product to wishlist", async () => {
      await this.wishListButton.click();
    });
    return this;
  }

  async compareProduct(): Promise<this> {
    await test.step("Add product to compare", async () => {
      await this.compareButton.click();
    });
    return this;
  }

  async validateRatingSection(): Promise<this> {
    await test.step("Validate rating section", async () => {
      await expect(
        this.ratingSection,
        "Rating section is visible"
      ).toBeVisible();
      await expect(
        this.ratingStars.first(),
        "Rating stars are visible"
      ).toBeVisible();
      await expect(this.reviewsLink, "Reviews link is visible").toBeVisible();
      await expect(
        this.writeReviewLink,
        "Write review link is visible"
      ).toBeVisible();
    });
    return this;
  }

  async navigateToDescriptionTab(): Promise<this> {
    await test.step("Navigate to Description tab", async () => {
      await this.descriptionTab.click();
      await expect(
        this.productDescription,
        "Description content is visible"
      ).toBeVisible();
      await expect(
        this.descriptionTab.locator(".."),
        "Description tab is active"
      ).toHaveClass(/active/);
    });
    return this;
  }

  async navigateToReviewsTab(): Promise<this> {
    await test.step("Navigate to Reviews tab", async () => {
      await this.reviewsTab.click();
      await expect(
        this.reviewSection,
        "Reviews content is visible"
      ).toBeVisible();
      await expect(
        this.reviewsTab.locator(".."),
        "Reviews tab is active"
      ).toHaveClass(/active/);
    });
    return this;
  }

  async validateBreadcrumbNavigation(): Promise<this> {
    await test.step("Validate breadcrumb structure", async () => {
      await expect(this.breadcrumb, "Breadcrumb is visible").toBeVisible();
      await expect(
        this.breadcrumbHome,
        "Home breadcrumb link is visible"
      ).toBeVisible();
      await expect(
        this.breadcrumbIphone,
        "iPhone breadcrumb link is visible"
      ).toBeVisible();
    });
    return this;
  }

  async navigateToHomepageViaBreadcrumb(): Promise<this> {
    await test.step("Navigate back to homepage via breadcrumb", async () => {
      await this.breadcrumbHome.click();
      await expect(
        this.page.locator('h3:has-text("Featured")'),
        "Back on homepage - Featured section visible"
      ).toBeVisible();
    });
    return this;
  }

  async validateImageGallery(): Promise<this> {
    await test.step("Validate main product image", async () => {
      await expect(
        this.mainProductImage,
        "Main product image is visible"
      ).toBeVisible();
      await expect(
        this.mainProductImage,
        "Main product image has alt text"
      ).toHaveAttribute("alt", "iPhone");
    });

    await test.step("Validate additional images", async () => {
      const additionalImagesCount = await this.additionalImages.count();
      expect(
        additionalImagesCount,
        "Multiple additional images are present"
      ).toBeGreaterThan(0);

      await expect(
        this.additionalImages.first(),
        "First additional image is visible"
      ).toBeVisible();
      await expect(
        this.additionalImages.first(),
        "First additional image has alt text"
      ).toHaveAttribute("alt", "iPhone");
    });

    await test.step("Validate image thumbnails", async () => {
      const thumbnailsCount = await this.productImageThumbnails.count();
      expect(
        thumbnailsCount,
        "Multiple image thumbnails are present"
      ).toBeGreaterThan(1);
    });

    return this;
  }

  async validateDetailedProductInformation(): Promise<this> {
    await test.step("Validate detailed product information", async () => {
      // Detailed brand validation
      await expect(
        this.productBrand,
        "Brand section contains 'Brand: Apple'"
      ).toContainText("Brand:");
      await expect(
        this.productBrand.locator("a"),
        "Apple brand link is present"
      ).toHaveText("Apple");

      // Product code validation
      await expect(
        this.productCode,
        "Product code is 'product 11'"
      ).toContainText("Product Code: product 11");

      // Availability validation
      await expect(
        this.productAvailability,
        "Product is in stock"
      ).toContainText("Availability: In Stock");

      // Price validation
      await expect(this.productPrice, "Main price is $101.00").toHaveText(
        "$101.00"
      );
      await expect(
        this.productExTaxPrice,
        "Ex Tax price is displayed correctly"
      ).toContainText("Ex Tax: $101.00");
    });
    return this;
  }

  async validateDescriptionContent(): Promise<this> {
    await test.step("Validate product description content", async () => {
      await this.validateProductDescription();
      const descriptionText = await this.productDescription.textContent();
      expect(descriptionText, "Description contains key features").toContain(
        "revolutionary new mobile phone"
      );
      expect(descriptionText, "Description mentions address book").toContain(
        "address book"
      );
      expect(descriptionText, "Description mentions voicemail").toContain(
        "voicemail"
      );
    });
    return this;
  }

  async takeVisualSnapshots(): Promise<this> {
    await test.step("Take full page screenshot", async () => {
      await this.iphoneProductVisualCheck();
    });

    await test.step("Take product details section screenshot", async () => {
      await expect(
        this.page.locator('.col-sm-4:has(h1:has-text("iPhone"))')
      ).toHaveScreenshot("iphone_product_details.png");
    });

    await test.step("Take product images section screenshot", async () => {
      await expect(
        this.page.locator(".col-sm-8:has(.thumbnails)")
      ).toHaveScreenshot("iphone_product_images.png");
    });

    return this;
  }

  async iphoneProductVisualCheck(): Promise<this> {
    await expect(this.page).toHaveScreenshot("eshop_iphone_product.png", {
      fullPage: true,
    });
    return this;
  }
}
