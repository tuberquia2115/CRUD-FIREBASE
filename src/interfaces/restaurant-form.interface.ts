import { IRestaurant } from "./restaurant.interface";

export interface RestaurantFormProps {
  restaurant?: IRestaurant;
  isExecutedAction?: boolean;
  onHandlerSubmit(
    data: Omit<IRestaurant, "id" | "creationDate"> &
      Partial<Pick<IRestaurant, "id" | "creationDate">>
  ): void;
}
