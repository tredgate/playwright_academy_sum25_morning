import { expect, Locator, Page, test } from "@playwright/test";
import { EshopIphonePage } from "./eshop_iphone_page.ts";

export class EshopHomepage {
  readonly page: Page;
  readonly url = "https://tredgate.com/eshop/index.php?route=common/home";

  // Header elements
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly cartTotal: Locator;

  // Navigation menu
  readonly menuDesktops: Locator;
  readonly menuLaptops: Locator;
  readonly menuComponents: Locator;
  readonly menuTablets: Locator;
  readonly menuSoftware: Locator;
  readonly menuPhones: Locator;
  readonly menuCameras: Locator;
  readonly menuMp3Players: Locator;

  // Featured products section
  readonly featuredTitle: Locator;
  readonly featuredProducts: Locator;
  readonly iphoneProduct: Locator;
  readonly iphoneProductTitle: Locator;
  readonly iphoneProductPrice: Locator;
  readonly iphoneProductImage: Locator;
  readonly iphoneAddToCartButton: Locator;

  // Slideshow
  readonly slideshow: Locator;
  readonly slideshowPagination: Locator;

  // Footer
  readonly footer: Locator;
  readonly footerInformation: Locator;
  readonly footerCustomerService: Locator;
  readonly footerExtras: Locator;
  readonly footerMyAccount: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header elements
    this.logo = page.locator("#logo img");
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator(".input-group-btn button");
    this.cartButton = page.locator("#cart");
    this.cartTotal = page.locator("#cart-total");

    // Navigation menu
    this.menuDesktops = page.locator('a:has-text("Desktops")').first();
    this.menuLaptops = page
      .locator('a:has-text("Laptops & Notebooks")')
      .first();
    this.menuComponents = page.locator('a:has-text("Components")').first();
    this.menuTablets = page.locator('a:has-text("Tablets")');
    this.menuSoftware = page.locator('a:has-text("Software")');
    this.menuPhones = page.locator('a:has-text("Phones & PDAs")');
    this.menuCameras = page.locator('a:has-text("Cameras")');
    this.menuMp3Players = page.locator('a:has-text("MP3 Players")').first();

    // Featured products section
    this.featuredTitle = page.locator('h3:has-text("Featured")');
    this.featuredProducts = page.locator(".product-layout");
    this.iphoneProduct = page.locator(
      '.product-layout:has(.product-thumb:has(h4:has(a:has-text("iPhone"))))'
    );
    this.iphoneProductTitle = this.iphoneProduct.locator(
      'h4 a:has-text("iPhone")'
    );
    this.iphoneProductPrice = this.iphoneProduct.locator(".price");
    this.iphoneProductImage = this.iphoneProduct.locator(".image img");
    this.iphoneAddToCartButton = this.iphoneProduct.locator(
      'button:has-text("Add to Cart")'
    );

    // Slideshow
    this.slideshow = page.locator(".slideshow");
    this.slideshowPagination = page.locator(".swiper-pagination");

    // Footer
    this.footer = page.locator("footer");
    this.footerInformation = this.footer.locator('h5:has-text("Information")');
    this.footerCustomerService = this.footer.locator(
      'h5:has-text("Customer Service")'
    );
    this.footerExtras = this.footer.locator('h5:has-text("Extras")');
    this.footerMyAccount = this.footer.locator('h5:has-text("My Account")');
  }

  async openHomepage(): Promise<this> {
    await test.step("Open Eshop Homepage", async () => {
      await this.page.goto(this.url);
      await this.homepageVisualCheck();
    });
    return this;
  }

  async clickIphoneProduct(): Promise<EshopIphonePage> {
    await test.step("Click on iPhone product", async () => {
      await this.iphoneProductTitle.click();
    });
    return new EshopIphonePage(this.page);
  }

  async clickIphoneProductImage(): Promise<EshopIphonePage> {
    await test.step("Click on iPhone product image", async () => {
      await this.iphoneProductImage.click();
    });
    return new EshopIphonePage(this.page);
  }

  async searchForProduct(searchTerm: string): Promise<this> {
    await test.step(`Search for product: ${searchTerm}`, async () => {
      await this.searchInput.fill(searchTerm);
      await this.searchButton.click();
    });
    return this;
  }

  async validateHomepageStructure(): Promise<this> {
    await test.step("Validate homepage structure", async () => {
      // Header validation
      await expect(this.logo, "Logo is visible").toBeVisible();
      await expect(this.searchInput, "Search input is visible").toBeVisible();
      await expect(this.cartButton, "Cart button is visible").toBeVisible();

      // Navigation menu validation
      await expect(this.menuDesktops, "Desktops menu is visible").toBeVisible();
      await expect(this.menuLaptops, "Laptops menu is visible").toBeVisible();
      await expect(
        this.menuComponents,
        "Components menu is visible"
      ).toBeVisible();
      await expect(this.menuTablets, "Tablets menu is visible").toBeVisible();

      // Featured section validation
      await expect(
        this.featuredTitle,
        "Featured title is visible"
      ).toBeVisible();
      await expect(
        this.featuredTitle,
        "Featured title has correct text"
      ).toHaveText("Featured");

      // Footer validation
      await expect(this.footer, "Footer is visible").toBeVisible();
      await expect(
        this.footerInformation,
        "Footer Information section is visible"
      ).toBeVisible();
      await expect(
        this.footerCustomerService,
        "Footer Customer Service section is visible"
      ).toBeVisible();
    });
    return this;
  }

  async validateIphoneProductCard(): Promise<this> {
    await test.step("Validate iPhone product card", async () => {
      await expect(
        this.iphoneProduct,
        "iPhone product card is visible"
      ).toBeVisible();
      await expect(
        this.iphoneProductTitle,
        "iPhone product title is visible"
      ).toBeVisible();
      await expect(
        this.iphoneProductTitle,
        "iPhone product title has correct text"
      ).toHaveText("iPhone");
      await expect(
        this.iphoneProductPrice,
        "iPhone product price is visible"
      ).toBeVisible();
      await expect(
        this.iphoneProductPrice,
        "iPhone product price contains $101.00"
      ).toContainText("$101.00");
      await expect(
        this.iphoneProductImage,
        "iPhone product image is visible"
      ).toBeVisible();
      await expect(
        this.iphoneAddToCartButton,
        "iPhone Add to Cart button is visible"
      ).toBeVisible();
    });
    return this;
  }

  async homepageVisualCheck(): Promise<this> {
    await expect(this.page).toHaveScreenshot("eshop_homepage.png", {
      fullPage: true,
    });
    return this;
  }
}
