import { Timestamp } from "firebase/firestore";

export interface IRestaurant {
  id: string;
  name: string;
  isActive: boolean;
  creationDate: Timestamp;
}
