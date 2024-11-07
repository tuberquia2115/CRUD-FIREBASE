import { useEffect, useState } from "react";

import { ApiService } from "@/firebase/service";
import { IRestaurant } from "@/interfaces";

export const useRestaurant = () => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isExecutedAction, setIsExecutedAction] = useState(false);

  const [restaurants, setRestaurants] = useState<IRestaurant[]>();

  const { restaurantService } = ApiService;

  const onDeleteRestaurant = async (id: string) => {
    const ok = confirm("Confirm deletion");
    if (ok) {
      await restaurantService.doDeleteRestaurant(id);
    }
  };

  const onAddRestaurant = async (data: IRestaurant) => {
    setIsExecutedAction(true);
    await restaurantService.doCreateRestaurant(data);
    setIsExecutedAction(false);
  };

  const onEditRestaurant = async (
    id: string,
    newData: Omit<IRestaurant, "creationDate">
  ) => {
    setIsExecutedAction(true);
    await restaurantService.doEditRestaurant(id, newData);
    setIsExecutedAction(false);
  };

  useEffect(() => {
    const unsubscribe = restaurantService.doGetAllRestaurants((snapshot) => {
      const restaurantList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurants(restaurantList as IRestaurant[]);
      setIsLoadingRestaurants(false);
    });

    return () => unsubscribe();
  }, [restaurantService]);

  return {
    restaurants,
    isExecutedAction,
    isLoadingRestaurants,
    onDeleteRestaurant,
    onAddRestaurant,
    onEditRestaurant,
  };
};
