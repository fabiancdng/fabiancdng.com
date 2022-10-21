/**
 * Data of a social media button.
 */
export default interface SocialButtonData {
  id: number;
  attributes: {
    title: string;
    url: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
}
