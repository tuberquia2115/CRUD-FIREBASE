import React, { useState } from "react";
import { BadgePlus, CirclePlus, CircleX, Pencil, Store } from "lucide-react";

import { useRestaurant } from "@/hooks";
import { IRestaurant } from "@/interfaces";
import { NoRestaurants } from "../molecules";
import { Button, Spinner, Title } from "../atoms";

const RestaurantForm = React.lazy(() => import("../organisms/restaurant-form"));
const RestaurantList = React.lazy(() => import("../organisms/restaurant-list"));

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

  const renderSpinner = (
    <div className="w-full flex justify-center items-center ">
      <Spinner />
    </div>
  );

  const renderRestaurantList = () => {
    if (isLoadingRestaurants) {
      return renderSpinner;
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

  const renderRestaurantForm = () => (
    <RestaurantForm
      restaurant={restaurantSelected}
      isExecutedAction={isExecutedAction}
      onHandlerSubmit={handlerSubmit}
    />
  );

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
        <React.Suspense fallback={renderSpinner}>
          {isActionList ? renderRestaurantList() : renderRestaurantForm()}
        </React.Suspense>
      </div>
    </div>
  );
};
