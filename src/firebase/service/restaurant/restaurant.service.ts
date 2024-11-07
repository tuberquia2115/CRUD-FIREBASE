import { Firebase } from "@/firebase";
import { IRestaurant } from "@/interfaces";
import * as firestore from "firebase/firestore";

class RestaurantService {
  private restaurantProvider: Firebase;
  constructor() {
    this.restaurantProvider = new Firebase();
  }

  async doCreateRestaurant(data: Omit<IRestaurant, "creationDate">) {
    try {
      await this.restaurantProvider.doCreateCollectionDocument("restaurants", {
        ...data,
        creationDate: firestore.Timestamp.now(),
      });
    } catch (error) {
      console.log("Error creating document", error);
    }
  }

  async doEditRestaurant(
    docId: string,
    newData: Omit<IRestaurant, "creationDate">
  ) {
    try {
      await this.restaurantProvider.doEditCollectionDocument(
        "restaurants",
        docId,
        newData
      );
    } catch (error) {
      console.log("Error updating document", error);
    }
  }

  async doGetRestaurant(docId: string) {
    try {
      const snapshot = await this.restaurantProvider.doGetCollectionDocument(
        "restaurants",
        docId
      );

      return snapshot;
    } catch (error) {
      console.log("Error getting a document", error);
    }
  }

  async doDeleteRestaurant(docId: string) {
    try {
      await this.restaurantProvider.doDeleteCollectionDocument(
        "restaurants",
        docId
      );
    } catch (error) {
      console.log("Error deleting a document", error);
    }
  }

  doGetAllRestaurants(
    callback: (
      snapshot: firestore.QuerySnapshot<firestore.DocumentData>
    ) => void
  ) {
    const unsubscribe = this.restaurantProvider.doGetAllCollectionDocument(
      "restaurants",
      callback
    );

    return unsubscribe;
  }
}

export default RestaurantService;
