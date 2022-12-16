const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  // postId: {
  //   // type: Number,
  //   // required: true,
  //   unique: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   // required: true, required를 빼줘야 한다. required는 소비자들이 넣어줘야 하는 것이다.
  //   // unique: true, //postId에는 중복이 되면 안되서 넣어줬는데 유니크 넣으면 왜 에러가 나는 것인가
  // },
  user: {
    type: String,
    // required: true,
    // unique: true, => 데이터베이스에 나 하나만 있어야해! 그래서 추가생성이 안돼!ㅠㅠ
  },
  password: { type: String, required: true, trim: true },
  title: {
    type: String,
  },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postsSchema, 'posts');
//컬렉션스를 쓸 때 Goods 라는 이름을 쓸 것이기 때문에
//스튜디오3T에서 collection 안에 goods가 생성된 것을 알 수 있다.
