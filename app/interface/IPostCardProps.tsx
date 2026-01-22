import IPostData from "./IPostData";

export default interface IPostCardProps {
  post: IPostData;
  onPress: () => void; // Significa que é uma função que não retorna nada
}