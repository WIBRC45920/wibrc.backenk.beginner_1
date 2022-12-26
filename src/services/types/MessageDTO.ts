import { Optional } from "sequelize";

export type MessageDTO = {
    id: string;
    textContent: string;
    imageContent: string;
}

export interface MesssageOuput extends Optional<MessageDTO, "textContent" | "imageContent"> {}
export interface MesssageInput extends Required<MessageDTO> {}