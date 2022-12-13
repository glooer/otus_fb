import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostService } from 'src/posts/post.service';
import { WithAuth } from 'src/user/jwt/jwt.auth.guard';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post("create")
  @WithAuth()
  postCreate(
    @Body() data: CreatePostDto,
    @Request() req: any
  ) {
    return this.postService.createPost(req.user.id, data);
  }

  @Get("feed")
  @WithAuth()
  getFeed(
    @Request() req: any
  ) {
    return this.postService.getFeedPost(req.user.id);
  }

}
