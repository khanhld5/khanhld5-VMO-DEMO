const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const orderStatus = require('./orderStatus.js');
const jsonServer = require('json-server');
const queryString = require('query-string');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'leKhanh_dep_trai';
const expiresIn = '1w';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

const userDb = JSON.parse(fs.readFileSync('./src/users.json', 'UTF-8'));
const productsDb = JSON.parse(fs.readFileSync('./src/db.json', 'UTF-8'));
const commentsDb = JSON.parse(fs.readFileSync('./src/comments.json', 'UTF-8'));
const receiversDb = JSON.parse(
  fs.readFileSync('./src/receivers.json', 'UTF-8')
);
const ordersDb = JSON.parse(fs.readFileSync('./src/orders.json', 'UTF-8'));
const goodsDb = JSON.parse(fs.readFileSync('./src/goods.json', 'UTF-8'));

const writeJsonFile = (writePath, data) => {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFile(writePath, jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
};
const getUserById = (id) => userDb.users.find((user) => user.id === id);
const getUserReceiversById = (id) => {
  const userId = Object.keys(receiversDb.users).find((item) => item === id);
  if (userId) {
    const userReceivers = [...receiversDb.users[userId]];
    return userReceivers;
  }
  return false;
};
const getOrdersById = (userId) =>
  ordersDb.orders.filter((item) => item.user.userId === userId);

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  return (
    userDb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

server.use(jsonServer.bodyParser);

// console.log(uuidv4());

// server.get('/get/user', (req, res) => {
//   let userId = req.query['userId'];
//   if (userId != null && userId >= 0) {
//     let result = userDb.users.find((user) => user.userId == userId);
//     if (result) {
//       let { userId, ...user } = result;
//       res.status(200).jsonp(user);
//     } else {
//       res.status(400).jsonp({
//         error: 'Bad userId',
//       });
//     }
//   } else {
//     res.status(400).jsonp({
//       error: 'No valid userId',
//     });
//   }
// });
// server.post('/post/login', (req, res) => {
//   if (req.method === 'POST') {
//     const username = req.body['username'];
//     const password = req.body['password'];
//     const result = userDb.users.find(
//       (user) => user.username === username && user.password === password
//     );
//     if (result) {
//       let { password, ...user } = result;
//       res.status(200).jsonp(user);
//     } else {
//       res.status(400).jsonp({
//         error: 'No valid user',
//       });
//     }
//   }
// });

//on working
server.get('/product-detail', (req, res) => {
  const { id } = req.query;
  if (id != null && id.length) {
    let result = productsDb.products.find((product) => product.id == id);
    if (result) {
      //get categorys
      let category = [];
      for (let cate of productsDb.category) {
        for (let product of cate.products) {
          if (product === id) {
            category.push({ id: cate.id, title: cate.title });
            break;
          }
        }
      }
      if (!category.length) {
        category = ['This product is currently not in any category'];
      }
      //get comments
      let comments = [];
      for (let product in commentsDb.products) {
        if (product === id) {
          for (let comment of commentsDb.products[product]) {
            const user = userDb.users.find(
              (user) => user.id === comment.userId
            );
            let { username, avatar } = user;
            let { id, date, title, score } = comment;
            comments.push({
              id,
              date,
              user: { username, avatar },
              title,
              score,
            });
          }
        }
      }
      if (!comments.length) {
        comments = ['This product dont have any comment just yet'];
      }
      let relatedList = [];
      for (let cate of productsDb.category) {
        if (cate.id === category[0].id) {
          for (let i = 0; i < 4; i++) {
            let product = productsDb.products.find(
              (item) => item.id == cate.products[i]
            );
            relatedList.push(product);
          }
        }
      }
      res.status(200).jsonp({ ...result, category, comments, relatedList });
    } else {
      res.status(400).jsonp({ error: 'Product not exist' });
    }
  } else {
    res.status(400).jsonp({ error: 'No valid product id' });
  }
});
//

// get related product

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (isAuthenticated({ username, password }) === false) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ message });
    return;
  }

  const result = userDb.users.find(
    (user) => user.username === username && user.password === password
  );
  const userReceivers = getUserReceiversById(result.id) || [];
  const userOrders = getOrdersById(result.id) || [];
  const user = { ...result };
  delete user.password;
  const access_token = createToken({ username, password });
  res.status(200).json({
    ...user,
    receivers: userReceivers,
    orders: userOrders,
    access_token,
  });
});

server.post('/auth/register', (req, res) => {
  if (req.method === 'POST') {
    const { username, password, email, fullname, address, cmt, sdt } = req.body;
    if (userDb.users.some((item) => item.username === username)) {
      const status = 409;
      const message = 'User already existed';
      res.status(status).json({ message });
      return;
    }
    const newUser = {
      id: uuidv4(),
      username,
      password,
      email,
      fullname,
      address,
      cmt,
      sdt,
      admin: false,
      avatar: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
    };
    userDb.users.push(newUser);
    writeJsonFile('./src/users.json', userDb);
    const result = userDb.users.find((user) => user.username === username);
    const user = { ...result };
    delete user.password;
    const access_token = createToken({ username, password });
    res.status(200).json({ ...user, orders: [], receivers: [], access_token });
  }
});

server.put('/auth/editInfo', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { payload } = req.body;
      const user = getUserById(payload.id);
      delete payload.id;
      for (let item in payload) {
        user[item] = payload[item];
      }

      for (let item of userDb.users) {
        if (item.id === user.id) {
          item = { ...user };
        }
      }

      writeJsonFile('./src/users.json', userDb);
      const result = getUserById(user.id);
      const newUser = { ...result };
      delete newUser.password;
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      res.status(200).json({ ...newUser, access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});
server.put('/auth/changePassword', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { payload } = req.body;
      const user = getUserById(payload.id);
      delete payload.id;
      if (user.password !== payload.oldPassword) {
        const status = 406;
        const message = 'Old password is incorrect';
        res.status(status).json({ status, message });
        return;
      }
      user.password = payload.newPassword;
      for (let item of userDb.users) {
        if (item.id === user.id) {
          item = { ...user };
        }
      }

      writeJsonFile('./src/users.json', userDb);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      res.status(200).json({ access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});

server.post('/auth/addReceiver', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { payload } = req.body;
      const user = getUserById(payload.id);
      const userReceivers = getUserReceiversById(payload.id) || [];

      userReceivers.push({
        id: uuidv4(),
        receiver: payload.receiver,
        address: payload.address,
        phone: payload.phone,
      });
      receiversDb.users[payload.id] = [...userReceivers];
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      writeJsonFile('./src/receivers.json', receiversDb);
      res.status(200).json({ receivers: userReceivers, access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});

server.post('/auth/removeReceiver', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { payload } = req.body;
      const user = getUserById(payload.id);

      const userReceivers = getUserReceiversById(payload.userId) || [];

      const newReceivers = userReceivers.filter(
        (item) => item.id !== payload.id
      );
      receiversDb.users[payload.userId] = [...newReceivers];
      const result = getUserReceiversById(payload.userId);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      writeJsonFile('./src/receivers.json', receiversDb);
      res.status(200).json({ receivers: result, access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});

server.post('/auth/checkout', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { payload } = req.body;
      const newOrder = {
        id: uuidv4(),
        user: { userId: payload.userId, receiverId: payload.receiver },
        products: payload.products,
        total: payload.total,
        orderDate: Date.now(),
        deliveryDate: 0,
        status: orderStatus.ORDER_SAVED,
      };
      ordersDb.orders.push(newOrder);
      //token
      const user = getUserById(payload.userId);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      writeJsonFile('./src/orders.json', ordersDb);
      // writeJsonFile('./src/goods.json', goodsDb);
      res.status(200).json({ access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});

server.get('/auth/orders', (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  const token = verifyToken(req.headers.authorization.split(' ')[1]);
  if (token) {
    if (token.exp - token.iat) {
      const { userId } = req.query;
      const orders = getOrdersById(userId);
      //create new token
      const user = getUserById(userId);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      res.status(200).json({ orders, access_token });
      return;
    }
    const status = 401;
    const message = 'Your session has been expired, please login again';
    res.status(status).json({ status, message });
    return;
  }
  const status = 401;
  const message = 'Your have an invalid token';
  res.status(status).json({ status, message });
});

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);
    const result = {
      list: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };
    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

server.use(middlewares);
server.use(router);
server.listen(8080, () => {
  console.log('JSON Server is running');
});
