import { Faction } from './faction_system';
import { Item, Resource } from './resource_management';

interface TradeOffer {
  itemId: string;
  quantity: number;
  pricePerUnit: number;
}

interface Market {
  offers: TradeOffer[];
  demandModifiers: Record<string, number>;
}

class EconomySystem {
  private markets: Record<string, Market> = {};

  constructor() {
    // Initialize markets for each faction
  }

  public updateMarket(factionId: string, itemId: string, quantity: number, price: number): void {
    const market = this.markets[factionId];
    const offerIndex = market.offers.findIndex(offer => offer.itemId === itemId);
    if (offerIndex !== -1) {
      market.offers[offerIndex].quantity += quantity;
      market.offers[offerIndex].pricePerUnit = price;
    } else {
      market.offers.push({ itemId, quantity, pricePerUnit: price });
    }
    this.adjustDemand(factionId, itemId, quantity);
  }

  private adjustDemand(factionId: string, itemId: string, quantity: number): void {
    const market = this.markets[factionId];
    const demandChange = quantity * 0.05; // Simplified demand change factor
    market.demandModifiers[itemId] = (market.demandModifiers[itemId] || 0) + demandChange;
  }

  public executeTrade(buyerFaction: Faction, sellerFaction: Faction, offer: TradeOffer): boolean {
    const buyerMarket = this.markets[buyerFaction.id];
    const sellerMarket = this.markets[sellerFaction.id];
    const sellerOffer = sellerMarket.offers.find(o => o.itemId === offer.itemId && o.quantity >= offer.quantity);

    if (!sellerOffer || buyerFaction.resources.credits < offer.quantity * offer.pricePerUnit) {
      return false; // Trade cannot be executed
    }

    // Execute trade
    sellerOffer.quantity -= offer.quantity;
    buyerFaction.resources.credits -= offer.quantity * offer.pricePerUnit;
    sellerFaction.resources.credits += offer.quantity * offer.pricePerUnit;

    // Update buyer's resources
    const item = new Item(offer.itemId);
    buyerFaction.resources.addItem(item, offer.quantity);

    return true;
  }

  public simulateMarketFluctuations(): void {
    Object.keys(this.markets).forEach(factionId => {
      const market = this.markets[factionId];
      market.offers.forEach(offer => {
        // Random market fluctuation
        offer.pricePerUnit *= (1 + (Math.random() - 0.5) / 10);
      });
    });
  }
}

export { EconomySystem, TradeOffer, Market };
