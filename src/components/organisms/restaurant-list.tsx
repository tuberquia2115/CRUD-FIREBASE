import React from "react";
import { Edit, Trash2 } from "lucide-react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms";
import { RestaurantListProps } from "@/interfaces";

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onHandleEdit,
  onHandleDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Creation Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id} className="text-center">
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      restaurant.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {restaurant.isActive ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
                <TableCell>
                  {restaurant.creationDate.toDate().toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onHandleEdit(restaurant)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onHandleDelete(restaurant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
