/**
 * @file RatingModel.ts
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of RatingModel interface
 */

export interface RatingModel {
  id: string;
  rating: number;
  postId: string;
  userEmail: string;
}
