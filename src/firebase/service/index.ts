import RestaurantService from "./restaurant/restaurant.service";

class ImplementService {
  public restaurantService: RestaurantService;
  constructor() {
    this.restaurantService = new RestaurantService();
  }
}

export const ApiService = new ImplementService();
