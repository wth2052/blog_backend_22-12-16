const express = require('express');
const app = express();
const port = 7070;

const postsRouter = require('./router/posts.js');
const commentsRouter = require('./router/comments.js');

const connect = require('./schemas/index.js');
connect();

app.use(express.json());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res, next) => {
  res.send('posts로들어가보세요 여기가 아닙니다.');
});

app.listen(port, () => {
  console.log(port, 'I am HERE');
});

//게시글 작성API 다양한코드

// router.post('/', async (req, res, next) => {
//   //   try {
//   //     const { user, password, title, content } = req.body;
//   //     await PostsDb.create({ user, password, title, content });

//   //     res.status(201).json({ message: '게시글을 생성하였습니다.' });
//   //   } catch (error) {
//   //     res.status(500).json({ message: '데이터 형식이 올바르지 않습니다.' });
//   //   }
//   // });

// router.post('/', async (req, res, next) => {
//   const { user, password, title, content } = req.body;
//   await PostsDb.create({ user, password, title, content });

//   res.status(201).json({ message: '게시글을 생성하였습니다.' });
// });

// router.put('/:_id', async (req, res, next) => {
//   const { _id } = req.params;
//   const { title, content, password } = req.body;

//   console.log(password);

//   if (password === password) {
//     const UpdatePost = await PostsDb.findOneAndUpdate(
//       { _id },
//       {
//         title,
//         content,
//       }
//     );
//     res.send(200).json({ message: '게시글을 수정하였습니다.' });
//   } else if (password !== password) {
//     res.send(400).json({ message: '비밀번호가 틀렸습니다.' });
//   } else if (
//     _id.length ||
//     title.length ||
//     content.length ||
//     password.length == 0
//   ) {
//     res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
//   } else if (_id.length == 0) {
//     res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
//   }
// });

// router.post('/', async (req, res) => {
//     try {
//       const { user, password, title, content } = req.body;

//       let postId = await PostsDb.find({}).sort('-postId').limit(1);

//       if (postId.length == 0) {
//         postId = 1;
//       } else {
//         postId = postId[0]['postId'] + 1;
//       }

//       // const today = new Date();
//       // const utc = today.getTime() + today.getTimezoneOffset() * 60 * 1000;
//       // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

//       // const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
//       // const day = kr_today;

//       await PostsDb.create({ postId, user, password, title, content });
//       res.send({
//         result: 'success',
//         modal_title: '저장 성공',
//         modal_body: '글이 성공적으로 저장 되었습니다.',
//       });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });

// router.post('/', async (req, res, next) => {
//   const { user, password, title, content } = req.body;

//   let postId = await PostsDb.find({}).sort('-postId').limit(1);
//   if (postId.length == 0) {
//     postId = 1;
//   } else {
//     postId = postId[0]['postId'] + 1;
//   }

//   await PostsDb.create({ postId, user, password, title, content });

//   res.send({ result: 'success' });
// });
