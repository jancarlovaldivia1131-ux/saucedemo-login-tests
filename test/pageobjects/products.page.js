import { $ } from '@wdio/globals'
import Page from './page.js';

class Products extends Page {
    getAddToCartButton (itemName) {
        return $(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`);
    }

    get cartBadge () {
        return $('.shopping_cart_badge');
    }

    async addToCart (itemName) {
        await this.getAddToCartButton(itemName).click();
    }
}

export default new Products();