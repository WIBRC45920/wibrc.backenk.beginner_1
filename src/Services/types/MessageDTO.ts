import { Optional } from "sequelize";

export type MessageDTO = {
  id: string;
  textContent: string;
  imageContent: string;
};

export type MesssageOuput = Optional<MessageDTO, "textContent" | "imageContent">;
export type MesssageInput = Required<MessageDTO>;
