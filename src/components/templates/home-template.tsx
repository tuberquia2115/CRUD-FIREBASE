import { useState } from "react";
import { BadgePlus, CirclePlus, CircleX, Pencil, Store } from "lucide-react";

import { IRestaurant } from "@/interfaces";
import { NoRestaurants } from "../molecules";
import { Button, Spinner, Title } from "../atoms";
import { RestaurantForm, RestaurantList } from "../organisms";

import { useRestaurant } from "@/hooks";

type Command = (data: IRestaurant) => Promise<void>;
type Action = "add" | "edit" | "list";

export const HomeTemplate = () => {
  const {
    restaurants,
    isExecutedAction,
    isLoadingRestaurants,
    onDeleteRestaurant,
    onAddRestaurant,
    onEditRestaurant,
  } = useRestaurant();
  const [restaurantSelected, setRestaurantSelected] = useState<IRestaurant>();
  const [action, setAction] = useState<Action>("list");
  const isActionList = action === "list";

  const addRestaurantCommand = async (data: IRestaurant) => {
    await onAddRestaurant(data);
    setAction("list");
  };

  const editRestaurantCommand = async (data: IRestaurant) => {
    await onEditRestaurant(data.id, data);
    setAction("list");
  };

  const restaurantActionHandlers: Record<string, Command> = {
    add: addRestaurantCommand,
    edit: editRestaurantCommand,
  };

  const handlerSubmit = async (data: IRestaurant) => {
    const command = restaurantActionHandlers[action];
    if (command) await command(data);
  };

  const handlerActionEdit = (item: IRestaurant) => {
    setAction("edit");
    setRestaurantSelected(item);
  };

  const renderRestaurantList = () => {
    if (isLoadingRestaurants) {
      return (
        <div className="w-full flex justify-center items-center ">
          <Spinner />
        </div>
      );
    }

    if (restaurants?.length === 0) {
      return <NoRestaurants />;
    }

    return (
      <RestaurantList
        restaurants={restaurants || []}
        onHandleEdit={handlerActionEdit}
        onHandleDelete={onDeleteRestaurant}
      />
    );
  };

  const renderRestaurantForm = () => {
    const props = {
      onHandlerSubmit: handlerSubmit,
      isExecutedAction,
      restaurant: restaurantSelected,
    };

    return <RestaurantForm {...props} />;
  };

  const commonElements = {
    btnLabel: "Cancel",
    btnIcon: <CircleX className="h-5 w-5" />,
    btnCallback: () => setAction("list"),
  };

  const createAction = (
    title: string,
    titleIcon: JSX.Element,
    overrideElements = {}
  ) => ({
    title,
    titleIcon,
    ...commonElements,
    ...overrideElements,
  });

  const restaurantActions = {
    list: createAction("Restaurants", <Store className="h-5 w-5" />, {
      btnLabel: "Add",
      btnIcon: <BadgePlus className="h-5 w-5" />,
      btnCallback: () => {
        setRestaurantSelected(undefined);
        setAction("add");
      },
    }),

    add: createAction(
      "Add a new restaurant",
      <CirclePlus className="h-5 w-5" />
    ),
    edit: createAction(
      "Update restaurant information",
      <Pencil className="h-5 w-5" />
    ),
  };

  return (
    <div className="flex justify-center min-h-screen bg-card">
      <div className="w-full max-w-4xl p-4 pt-8">
        <div className="flex flex-row w-full justify-between py-5">
          <Title
            title={restaurantActions[action].title}
            icon={restaurantActions[action].titleIcon}
          />

          <Button
            onClick={() => restaurantActions[action].btnCallback()}
            aria-label={`action ${restaurantActions[action].btnLabel}`}
          >
            {restaurantActions[action].btnIcon}
            {restaurantActions[action].btnLabel}
          </Button>
        </div>
        {isActionList ? renderRestaurantList() : renderRestaurantForm()}
      </div>
    </div>
  );
};
