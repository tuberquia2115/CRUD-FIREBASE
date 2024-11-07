import { PlusCircle } from "lucide-react";

import { Card, CardContent } from "../atoms";

export const NoRestaurants = () => (
  <Card className="w-full max-w-3xl mx-auto">
    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <PlusCircle className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">There are no restaurants</h2>
      <p className="text-muted-foreground mb-4">
        It looks like there are no restaurants listed yet. Add one to start
        filling the list.
      </p>
    </CardContent>
  </Card>
);
