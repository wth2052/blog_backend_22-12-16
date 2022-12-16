const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017/homework_crud')
    .catch((err) => console.log(err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

module.exports = connect;

//connect라는 변수는 밖으로 내보내 줄 때 화살표 함수로 되어있는 익명함수이기 때문에
//그래서 얘를 가지고 실행을 해야지만 몽구스가 커넥트가 될 것이다. => //connect();
