import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
}

export const Title = ({ title, icon }: Props) => (
  <div className="flex flex-row items-center">
    <h1 className="text text-3xl text-center text-primary pr-2">{title}</h1>{" "}
    {icon && icon}
  </div>
);
