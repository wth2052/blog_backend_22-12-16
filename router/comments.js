const express = require('express');
const router = express.Router();

const commentsDB = require('../schemas/comment.js');
const PostsDb = require('../schemas/post.js');

//댓글 목록 조회

router.get('/', async (req, res, next) => {
  const ShowAllComments = await commentsDB.find({}); // 작성된 모든 댓글 가져오기

  console.log(ShowAllComments);

  if (ShowAllComments.length) {
    res.status(200).json(
      ShowAllComments.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } else {
    res.status(400).json('작성된 게시글이 없습니다.');
  }
});

//댓글 쓰기

router.post('/:_id', async (req, res, next) => {
  const postId = req.params._id;
  // console.log(req.params);
  // console.log(postId);
  const { user, password, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
  }

  // const existsPost = await PostsDb.findById(postId);
  // console.log(existsPost);
  // console.log(existsPost._id); //new ObjectId("639ad7937bea8eaf2b446061")

  // if (!existsPost) {
  //   return res.status(404).json({
  //     message: 'param 없음, 댓글 달 게시글 조회에 실패하였습니다.',
  //   });
  // }

  createComment = await commentsDB.create({
    postId,
    user,
    password,
    content,
  });
  await commentsDB.populate(createComment, {
    path: 'postId',
  });

  res.status(201).json({ message: '댓글을 생성하였습니다.' });
});

//댓글 수정

router.put('/:_id', async (req, res, next) => {
  const commentId = req.params._id;
  const { password, content } = req.body;

  //댓글 수정 => # 404 _commentId에 해당하는 댓글이 존재하지 않을 경우
  if (!commentId) {
    return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
  }

  await commentsDB.updateOne({ _id: commentId }, { $set: { content } });
  res.status(201).json({ message: '댓글을 수정하였습니다.' });
});

//댓글 삭제

router.delete('/:_id', async (req, res, next) => {
  const commentId = req.params._id;
  const { password, content } = req.body;

  const exitsComment = await commentsDB.findById(commentId);
  console.log(exitsComment);

  //댓글 삭제 => # 400 body 또는 params를 입력받지 못한 경우

  //댓글 삭제 API => 댓글_id로 400 댓글 패스워드 불일치

  if (password !== exitsComment.password) {
    return res
      .status(400)
      .json({ message: ' 댓글 비밀번호를 다시 확인해주세요.' });
  }

  //게시글 삭제 API => 200 삭제 성공
  await commentsDB.deleteOne({ _id: commentId });
  res.status(200).json({ message: '댓글 삭제 성공했습니다.' });
});

//단일 게시글에 대한 모든 댓글 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log(postId); //639ad7937bea8eaf2b446061

  const ObjectId = require('mongoose').Types.ObjectId;
  const id = ObjectId(postId);
  console.log(id); //new ObjectId("639ad7937bea8eaf2b446061")

  const comments = await commentsDB.find({});
  console.log(comments); //전체 댓글 조회

  //이제 전체 중에서 comment안에 들어가 있는 postId 값 또느 user 값으로 필터링

  // 케이스 1 : postId 로 검색했을때 findcomments가 undefined 뜨는 문제

  const findCommentsForPostId = await commentsDB.find({ postId: postId }); //몽구스 문법으로 찾아 본 것.

  // const findCommentsForPostId = comments.filter((comment) => comment.postId === id);

  // 케이스 2 : 댓글 하나만 나오는 문제
  // const findCommentsForPostId = comments.filter(
  //   (comment) => comment.user === 'developer'
  // );

  console.log(findCommentsForPostId); //{ findcomments: undefined }
  res.status(200).json({ findCommentsForPostId });
});

module.exports = router;
