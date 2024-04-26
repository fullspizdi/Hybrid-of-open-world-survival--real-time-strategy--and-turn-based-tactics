import { Player, Item } from './base_classes';
import { getRandomInt, shuffleArray } from './utils';

/**
 * Crafting system for the game.
 * Manages the creation of items and tools from resources.
 */

interface Recipe {
    name: string;
    requiredItems: { item: string, quantity: number }[];
    resultItem: string;
    resultQuantity: number;
}

class CraftingSystem {
    private recipes: Recipe[];

    constructor() {
        this.recipes = this.loadRecipes();
    }

    /**
     * Loads all available crafting recipes.
     * @returns An array of Recipe objects.
     */
    private loadRecipes(): Recipe[] {
        return [
            {
                name: 'Water Filter',
                requiredItems: [{ item: 'Charcoal', quantity: 2 }, { item: 'Plastic Bottle', quantity: 1 }],
                resultItem: 'Clean Water',
                resultQuantity: 3
            },
            {
                name: 'Stone Axe',
                requiredItems: [{ item: 'Stone', quantity: 1 }, { item: 'Wood Stick', quantity: 2 }],
                resultItem: 'Axe',
                resultQuantity: 1
            },
            {
                name: 'Fire Starter',
                requiredItems: [{ item: 'Flint', quantity: 1 }, { item: 'Tinder', quantity: 1 }],
                resultItem: 'Fire',
                resultQuantity: 1
            }
            // More recipes can be added here
        ];
    }

    /**
     * Attempts to craft an item using the specified recipe.
     * @param player - The player who is crafting the item.
     * @param recipeName - The name of the recipe to use.
     * @returns A boolean indicating whether the crafting was successful.
     */
    craftItem(player: Player, recipeName: string): boolean {
        const recipe = this.recipes.find(r => r.name === recipeName);

        if (!recipe) {
            console.error('Recipe not found');
            return false;
        }

        // Check if player has all required items in the necessary quantities
        const hasAllItems = recipe.requiredItems.every(reqItem => {
            const itemInInventory = player.inventory.find(item => item.name === reqItem.item);
            return itemInInventory && itemInInventory.quantity >= reqItem.quantity;
        });

        if (!hasAllItems) {
            console.error('Not enough resources to craft the item');
            return false;
        }

        // Remove used items from player's inventory
        recipe.requiredItems.forEach(reqItem => {
            for (let i = 0; i < reqItem.quantity; i++) {
                const index = player.inventory.findIndex(item => item.name === reqItem.item);
                if (index !== -1) {
                    player.inventory.splice(index, 1);
                }
            }
        });

        // Add the crafted item to the player's inventory
        const craftedItem = new Item(recipe.resultItem, recipe.resultQuantity);
        player.addItem(craftedItem);

        console.log(`${recipe.resultQuantity} ${recipe.resultItem}(s) crafted successfully.`);
        return true;
    }
}

export default CraftingSystem;
