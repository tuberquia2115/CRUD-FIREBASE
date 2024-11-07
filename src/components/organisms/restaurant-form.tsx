import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { restaurantFormSchema } from "@/schema";
import { RestaurantFormProps } from "@/interfaces";
import { Spinner } from "../atoms/spinner";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Label,
  Switch,
} from "../atoms";

type FormValues = Zod.infer<typeof restaurantFormSchema>;

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  restaurant,
  isExecutedAction,
  onHandlerSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>({
    mode: "onTouched",
    values: restaurant,
    resolver: zodResolver(restaurantFormSchema),
  });

  const values = getValues();

  const isEditing = !!restaurant;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onHandlerSubmit({ ...restaurant, ...data });
  };

  watch("isActive");

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter restaurant name"
              aria-invalid={errors?.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name?.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="isActive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Status
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={values.isActive}
                onCheckedChange={(value) => setValue("isActive", value)}
              />
              <Label htmlFor="status" className="text-sm text-muted-foreground">
                {values.isActive ? "Active" : "Inactive"}
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isExecutedAction}>
            {isExecutedAction ? (
              <Spinner />
            ) : (
              <>{isEditing ? "Update Restaurant" : "Add Restaurant"}</>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RestaurantForm;
