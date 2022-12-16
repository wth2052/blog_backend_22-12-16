const express = require('express');
const router = express.Router();

const PostsDb = require('../schemas/post.js');

//전체 게시글 목록 조회 API +  내림차순정렬
router.get('/', async (req, res, next) => {
  const ShowAllPosts = await PostsDb.find({}); // 작성된 모든 post 가져오기

  console.log(ShowAllPosts);

  if (ShowAllPosts.length) {
    res.status(200).json(
      ShowAllPosts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } else {
    res.status(400).json('작성된 게시글이 없습니다.');
  }
});

//게시글 작성 API(제목, 작성자명, 비밀번호, 작성 내용을 입력하기)

router.post('/', async (req, res, next) => {
  try {
    const { user, password, title, content } = req.body;
    await PostsDb.create({ user, password, title, content });

    res.status(201).json({ message: '게시글을 생성하였습니다.' });
  } catch (error) {
    res.status(500).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
});

//게시글 상세 조회 API제목, 작성자명, 작성 날짜, 작성 내용을 조회하기

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  const showPostDetail = await PostsDb.findById(_id);
  console.log(showPostDetail);

  if (showPostDetail) {
    res.status(200).json(showPostDetail);
  } else {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
});

//게시글 수정 API
router.put('/:_id', async (req, res) => {
  const { _id } = req.params;
  const { password, title, content } = req.body;

  //게시글 수정 API => body를 확인해주세요
  if (!password || !title || !content) {
    return res.status(400).json({ message: 'body를 입력하지 않았습니다' });
  }

  const existsPosts = await PostsDb.find({ _id: _id });
  console.log(existsPosts);

  //게시글 수정 API => :_id를 확인해주세요
  if (!existsPosts.length) {
    return res.status(404).json({
      message: 'param 없음, 게시글 조회에 실패하였습니다.',
    });
  }

  console.log(existsPosts);

  //게시글 수정 API=> 비밀번호확인해주세요
  if (password !== existsPosts[0].password) {
    return res
      .status(400)
      .json({ errorMessage: '비밀번호를 다시 확인해주세요.' });
  }

  await PostsDb.updateOne({ _id }, { $set: { title, content } });
  res.status(201).json({ message: '게시글을 수정하였습니다.' });
});

//게시글 삭제 API

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  const { password } = req.body;

  const existsPostsForDelete = await PostsDb.findById(_id);
  console.log(existsPostsForDelete);

  //게시글 삭제 API => 404 _postId에 해당하는 게시글이 존재하지 않을 경우
  if (existsPostsForDelete == null) {
    return res
      .status(404)
      .json({ message: 'message: 게시글 조회에 실패하였습니다.' });
  }

  //게시글 삭제 API => 400 body 또는 params를 입력받지 못한 경우

  if (password !== existsPostsForDelete.password) {
    return res.status(400).json({ message: '비밀번호를 다시 확인해주세요.' });
  }

  //게시글 삭제 API => 200 삭제 성공
  if (password == existsPostsForDelete.password) {
    await PostsDb.deleteOne({ _id });
    return res.status(200).json({ meesage: '게시글 삭제 성공했습니다.' });
  }
});

module.exports = router;
