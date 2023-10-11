import { Box } from '@mui/joy'
import React from 'react'
import { postsStyle } from './styles/style'
import { PostModel } from '@src/shared/models/PostModel';
import { Post } from '@src/shared/components/Post/Post';

interface PostsProps{
    posts: PostModel[];
}

export const Posts = ({posts}:PostsProps) => {
  return (
    <Box sx={postsStyle}>{posts.map((post,index) => (
        <Post lastPost={index == posts.length - 1} key={post.id} {...post} />
      ))}</Box>
  )
}
