import { IRestaurant } from "./restaurant.interface";

export interface RestaurantListProps {
  restaurants: IRestaurant[];
  onHandleEdit(restaurant: IRestaurant): void;
  onHandleDelete(id: string): void;
}
