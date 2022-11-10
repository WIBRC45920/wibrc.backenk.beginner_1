export type QuestionDTO = {
  id: string;
  title: string;
  description: string;
  status?: QuestionStatusDTO;
};
export enum QuestionStatusDTO {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
