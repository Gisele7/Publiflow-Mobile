import IPostData from "./IPostData";

export default interface IPostCardProps {
  post: IPostData;
  onPress?: () => void; 
  onEdit?: () => void; 
  onDelete?: () => void; 
}