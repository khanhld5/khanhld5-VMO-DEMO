const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { axios_base } = require('./ultils/axios_base');
const path = require('path');
const { cloudinary } = require('./ultils/cloudinary');
const orderStatus = require('./orderStatus.js');
const jsonServer = require('json-server');
const queryString = require('query-string');
const jwt = require('jsonwebtoken');
const { error } = require('console');

const SECRET_KEY = 'leKhanh_dep_trai';
const expiresIn = '1w';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const allProducts = [];
const middlewares = jsonServer.defaults();
const userDb = JSON.parse(fs.readFileSync('./src/users.json', 'UTF-8'));
const productsDb = JSON.parse(fs.readFileSync('./src/db.json', 'UTF-8'));
const commentsDb = JSON.parse(fs.readFileSync('./src/comments.json', 'UTF-8'));
const receiversDb = JSON.parse(
  fs.readFileSync('./src/receivers.json', 'UTF-8')
);
const ordersDb = JSON.parse(fs.readFileSync('./src/orders.json', 'UTF-8'));

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

const setAllProducts = (data) => {
  allProducts.length = 0;
  data.forEach((item) => allProducts.push(item));
};

const getAllProduct = () => {
  axios_base()
    .get('/product/read.php')
    .then(
      (res) => {
        const format = [];
        res.data.list.forEach((item) => {
          const newData = {
            ...item,
            left: item.productLeft,
          };
          delete newData.productLeft;

          newData.price = parseInt(newData.price);
          newData.quantity = parseInt(newData.quantity);
          newData.left = parseInt(newData.left);

          format.push(newData);
        });
        setAllProducts(format);
      },
      (error) => error.response.data
    );
};
getAllProduct();

const createProduct = async (product) => {
  try {
    const res = await axios_base().post('/product/create.php', { product });
    return { success: true, message: res.data.message };
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};
const editProduct = async (product) => {
  try {
    const res = await axios_base().post('/product/update.php', { product });
    return { success: true, message: res.data.message };
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};
const removeProduct = async (productId) => {
  try {
    const res = await axios_base().delete('/product/delete.php', {
      data: {
        id: productId,
      },
    });
    return { success: true, message: res.data.message };
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

const searchProduct = async (keyword) => {
  try {
    const res = await axios_base().get('/product/search.php', {
      params: {
        s: keyword,
      },
    });
    return { success: true, data: res.data.list };
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

const getProductById = (productId) => {
  const product = allProducts.find((item) => item.id === productId);
  if (product) {
    return product;
  } else return { error: true, message: 'No product' };
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
const getOrdersByUserId = (userId) =>
  ordersDb.orders.filter((item) => item.user.userId === userId) || {};
const getOrdersByOrderId = (orderId) =>
  ordersDb.orders.find((item) => item.id === orderId);

const getProductCommentById = (id) => {
  for (let productId in commentsDb.products) {
    if (productId === id) return commentsDb.products[productId];
  }
  return {};
};

const getProductCategoryById = (productId) => {
  const product = JSON.parse(JSON.stringify(getProductById(productId)));
  product.category = [];
  productsDb.categories.forEach((cate) => {
    productsDb.product_in_category.forEach((item) => {
      if (item.categoryId === cate.id && item.productId === productId) {
        product.category.push(cate);
      }
    });
  });
  return product;
};

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// upload file
const upload = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file);
    return res;
  } catch (error) {
    return { error: true, message: 'Unable to upload this file' };
  }
};

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

// Check if the customer exists in database
function isAuthenticated({ username, password }) {
  return (
    userDb.users.findIndex(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.admin === false
    ) !== -1
  );
}

// Check if the admin exists in database
function isAdmin({ username, password }) {
  return (
    userDb.users.findIndex(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.admin === true
    ) !== -1
  );
}

server.use(jsonServer.bodyParser);

//For general use

server.get('/products', async (req, res) => {
  const { page, limit, s, sort, order, categoryId } = req.query;
  const result = [];
  if (!s) {
    if (categoryId) {
      const productOfCate = [];
      const cateProduct = productsDb.product_in_category.filter(
        (item) => item.categoryId === categoryId
      );
      cateProduct.forEach((item) =>
        allProducts.forEach((product) => {
          if (item.productId === product.id) {
            productOfCate.push(product);
          }
        })
      );
      const sortProductOfCate = productOfCate.sort(
        (cur, acc) => cur.price - acc.price
      );
      if (order === 'desc') {
        sortProductOfCate.reverse();
      }
      for (let i = (page - 1) * limit; i < limit * page; i++) {
        if (sortProductOfCate[i]) result.push(sortProductOfCate[i]);
      }
      if (result.length) {
        res.status(200).jsonp({
          list: result,
          pagination: { page, limit, total: sortProductOfCate.length },
        });
        return;
      }
      res.status(404).jsonp({
        message: 'No product just yet',
      });
      return;
    }
    const sortAllProducts = allProducts.sort(
      (cur, acc) => cur.price - acc.price
    );
    if (order === 'desc') {
      sortAllProducts.reverse();
    }
    for (let i = (page - 1) * limit; i < limit * page; i++) {
      if (sortAllProducts[i]) result.push(sortAllProducts[i]);
    }
    if (result.length) {
      res.status(200).jsonp({
        list: result,
        pagination: { page, limit, total: allProducts.length },
      });
      return;
    }
    res.status(404).jsonp({
      message: 'No product just yet',
    });
    return;
  } else {
    const searchResult = await searchProduct(s);
    if (searchResult.hasOwnProperty('success')) {
      if (categoryId) {
        const productOfCate = [];
        const cateProduct = productsDb.product_in_category.filter(
          (item) => item.categoryId === categoryId
        );
        cateProduct.forEach((item) =>
          searchResult.data.forEach((product) => {
            if (item.productId === product.id) {
              productOfCate.push(product);
            }
          })
        );
        const sortProductOfCate = productOfCate.sort(
          (cur, acc) => cur.price - acc.price
        );
        if (order === 'desc') {
          sortProductOfCate.reverse();
        }
        for (let i = (page - 1) * limit; i < limit * page; i++) {
          if (sortProductOfCate[i]) result.push(sortProductOfCate[i]);
        }
        if (result.length) {
          res.status(200).jsonp({
            list: result,
            pagination: { page, limit, total: sortProductOfCate.length },
          });
          return;
        }
        res.status(404).jsonp({
          message: 'No product just yet',
        });
        return;
      }
      const sortSearchResult = searchResult.data.sort(
        (cur, acc) => cur.price - acc.price
      );
      if (order === 'desc') {
        sortSearchResult.reverse();
      }
      for (let i = (page - 1) * limit; i < limit * page; i++) {
        if (sortSearchResult[i]) result.push(sortSearchResult[i]);
      }
      if (result.length) {
        res.status(200).jsonp({
          list: result,
          pagination: { page, limit, total: searchResult.data.length },
        });
        return;
      }
    }
    res.status(404).jsonp({
      message: 'No product just yet',
    });
    return;
  }
});

server.get('/product-detail', (req, res) => {
  const { id } = req.query;
  if (id != null && id.length) {
    let result = getProductById(id);
    if (result) {
      //get categorys
      let relatedList = [];

      let category = [];
      for (let item of productsDb.product_in_category) {
        if (item.productId === id) {
          category.push(
            productsDb.categories.find((cate) => cate.id === item.categoryId)
          );
        }
      }
      if (category.length) {
        let count = 0;
        for (let item of productsDb.product_in_category) {
          if (item.categoryId === category[0].id) {
            if (count === 4) break;
            relatedList.push(getProductById(item.productId));
            count++;
          }
        }
      }
      if (!category.length)
        category = ['This product is currently not in any category'];

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
      res.status(200).jsonp({ ...result, category, comments, relatedList });
    } else {
      res.status(400).jsonp({ error: 'Product not exist' });
    }
  } else {
    res.status(400).jsonp({ error: 'No valid product id' });
  }
});

//For admin

server.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (isAdmin({ username, password }) === false) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ message });
    return;
  }

  const result = JSON.parse(
    JSON.stringify(
      userDb.users.find(
        (user) =>
          user.username === username &&
          user.password === password &&
          user.admin === true
      )
    )
  );

  delete result.password;
  const access_token = createToken({ username, password });
  res.status(200).json({
    ...result,
    access_token,
  });
});

server.get('/admin/checkAvaiable', (req, res) => {
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
  const { username, password, exp, iat } = token;
  if (token) {
    if (exp - iat >= 7200) {
      res.status(200).json({ message: 'Still valid' });
      return;
    }
    if (exp - iat > 0 && exp - iat <= 7200) {
      const user = JSON.parse(
        JSON.stringify(
          userDb.users.find(
            (user) =>
              user.username === username &&
              user.password === password &&
              user.admin === true
          )
        )
      );
      if (!user) {
        const status = 401;
        const message = 'Your have an invalid token';
        res.status(status).json({ status, message });
        return;
      }
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

server.get('/admin/products', (req, res) => {
  const { page, limit } = req.query;
  const products = JSON.parse(JSON.stringify(allProducts));
  const result = [];
  for (let i = (page - 1) * limit; i < limit * page; i++) {
    if (products[i]) result.push(getProductCategoryById(products[i].id));
  }
  res.status(200).jsonp({
    list: result,
    pagination: { page, limit, total: products.length },
  });
});

server.post('/admin/addProduct', async (req, res) => {
  const { product } = req.body;
  const newProductsDb = JSON.parse(JSON.stringify(productsDb));
  const product_in_category = newProductsDb.product_in_category;
  const image = await upload(product.image);

  if (image.hasOwnProperty('error') && image.error === true) {
    const status = 503;
    res.status(status).json({ status, message: image.message });
    return;
  }
  product.image = image.url;

  const newProduct = {
    id: uuidv4(),
    ...product,
  };
  delete newProduct.category;
  for (let category of product.category) {
    const newCategory = {
      id: uuidv4(),
      categoryId: category,
      productId: newProduct.id,
    };
    product_in_category.push(newCategory);
  }
  const create = await createProduct(newProduct);
  if (create.hasOwnProperty('error')) {
    res.status(503).jsonp({ message: 'Unable to add product right now' });
    return;
  }
  writeJsonFile('./src/db.json', newProductsDb);
  if (create.hasOwnProperty('success')) {
    res.status(200).jsonp({ message: 'Adding success' });
    return;
  }
});

server.patch('/admin/editProduct', async (req, res) => {
  const { product } = req.body;
  const newProductsDb = JSON.parse(JSON.stringify(productsDb));
  const product_in_category = newProductsDb.product_in_category;

  const currentProduct = getProductById(product.id);
  if (!currentProduct) {
    res
      .status(404)
      .jsonp({ message: 'Not found this product, it might be removed' });
    return;
  }

  for (const key in currentProduct) {
    if (key === 'id') continue;
    switch (key) {
      case 'id':
        break;
      case 'image': {
        if (currentProduct[key] != product[key]) {
          const image = await upload(product.image);

          if (image.hasOwnProperty('error') && image.error === true) {
            const status = 503;
            res.status(status).json({ status, message: image.message });
            return;
          }
          currentProduct.image = image.url;
          break;
        }
      }
      case 'category': {
        const newCategories = product_in_category.filter(
          (item) => item.productId !== product.id
        );
        product.category.forEach((item) => {
          const newCate = {
            id: uuidv4(),
            categoryId: item,
            productId: product.id,
          };
          newCategories.push(newCate);
        });
        newProductsDb.product_in_category = newCategories;
        break;
      }
      default:
        if (currentProduct[key] !== product[key])
          currentProduct[key] = product[key];
    }
  }
  const edit = await editProduct(currentProduct);
  if (edit.hasOwnProperty('error')) {
    res.status(503).jsonp({ message: edit.error.message });
    return;
  }
  writeJsonFile('./src/db.json', newProductsDb);
  res.status(200).jsonp({ message: 'Adding success' });
});

server.delete('/admin/removeProduct', async (req, res) => {
  const { productId } = req.body;
  const remove = await removeProduct(productId);
  if (remove.hasOwnProperty('error')) {
    res.status(400).jsonp({ message: 'No product found' });
    return;
  }

  const newProductInCate = productsDb.product_in_category.filter(
    (item) => item.id !== productId
  );
  productsDb.product_in_category = newProductInCate;

  writeJsonFile('./src/db.json', productsDb);
  res.status(200).jsonp({ message: 'Remove success' });
});

server.post('/admin/addCategory', (req, res) => {
  const { title } = req.body;
  const newCategory = {
    id: uuidv4(),
    title,
  };
  productsDb.categories.push(newCategory);
  writeJsonFile('./src/db.json', productsDb);
  res.status(200).jsonp({
    message: 'Add category successfully',
    categories: productsDb.categories,
  });
});

server.patch('/admin/editCategory', (req, res) => {
  const { id, title } = req.body;
  const category = productsDb.categories.find((cate) => cate.id === id);
  if (!category) {
    res.status(400).jsonp({ message: 'Category not exist' });
    return;
  }
  category.title = title;
  writeJsonFile('./src/db.json', productsDb);
  res.status(200).jsonp({
    message: 'Add category successfully',
  });
});

server.post('/admin/addProductCategory', (req, res) => {
  const { productId, categoryId } = req.body;
  const exist = productsDb.product_in_category.findIndex(
    (item) => item.categoryId === categoryId && item.productId === productId
  );
  if (exist >= 0) {
    res.status(400).jsonp({ message: 'This product has been here' });
    return;
  }
  const newProductCategory = {
    id: uuidv4(),
    categoryId,
    productId,
  };
  productsDb.product_in_category.push(newProductCategory);
  writeJsonFile('./src/db.json', productsDb);
  const product = getProductCategoryById(productId);
  res.status(200).jsonp({ message: 'Add success', product });
});

server.delete('/admin/removeProductCategory', (req, res) => {
  const { productId, categoryId } = req.body;
  productsDb.product_in_category = productsDb.product_in_category.filter(
    (item) => item.categoryId !== categoryId || item.productId !== productId
  );

  writeJsonFile('./src/db.json', productsDb);
  const product = getProductCategoryById(productId);
  res.status(200).jsonp({ message: 'Add success', product });
});

server.delete('/admin/removeCategory', (req, res) => {
  const { categoryId } = req.body;
  productsDb.categories = productsDb.categories.filter(
    (cate) => cate.id !== categoryId
  );
  productsDb.product_in_category = productsDb.product_in_category.filter(
    (item) => item.categoryId !== categoryId
  );
  writeJsonFile('./src/db.json', productsDb);

  res.status(200).jsonp({ message: 'Remove success' });
});

server.patch('/admin/importProduct', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = getProductById(productId);
  if (product < 0) {
    res.status(400).jsonp({ message: 'Product not exist' });
    return;
  }
  product.quantity += quantity;
  product.left += quantity;
  const edit = await editProduct(product);
  if (edit.hasOwnProperty('error')) {
    res.status(503).jsonp({ message: edit.error.message });
    return;
  }
  const result = getProductCategoryById(productId);
  res.status(200).jsonp({ ...result });
});

server.get('/admin/orders', (req, res) => {
  const { page, limit, filter } = req.query;
  const orders = JSON.parse(JSON.stringify(ordersDb.orders)).reverse();
  const result = [];
  for (let i = (page - 1) * limit; i < limit * page; i++) {
    if (!orders[i]) break;
    const { userId, receiverId } = orders[i].user;
    const { username, fullname, sdt } = getUserById(orders[i].user.userId);
    const user = { username, fullname, sdt };
    const userReceivers = getUserReceiversById(userId);
    const receiver = userReceivers.find((item) => item.id === receiverId);
    orders[i].user = { user, receiver };
    result.push(orders[i]);
  }
  res
    .status(200)
    .jsonp({ list: result, pagination: { page, limit, total: orders.length } });
});

server.patch('/admin/orderStatus', (req, res) => {
  const { orderId, status } = req.body;
  const order = getOrdersByOrderId(orderId);
  switch (status) {
    case orderStatus.ORDER_SAVED:
      order.status = orderStatus.RECEIVE_ORDER;
      break;
    case orderStatus.RECEIVE_ORDER:
      order.status = orderStatus.DELIVER_ORDER;
      break;
    case orderStatus.DELIVER_ORDER:
      order.status = orderStatus.DELIVERED;
      break;
    default:
      res.status(400).jsonp({ message: 'Cant change this current status' });
      return;
  }
  writeJsonFile('./src/orders.json', ordersDb);
  res.status(200).jsonp({ message: 'Status update success' });
  return;
});

//For customer

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
  const userOrders = getOrdersByUserId(result.id) || [];
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
      //just added need check
      payload.products.forEach(async (item) => {
        const product = getProductById(item.productId);
        product.left -= item.quantity;
        await editProduct(product);
      });
      //
      ordersDb.orders.push(newOrder);
      //token
      const user = getUserById(payload.userId);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      writeJsonFile('./src/orders.json', ordersDb);
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
      const orders = getOrdersByUserId(userId);
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

server.post('/auth/comment', (req, res) => {
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
      const newComment = {
        id: uuidv4(),
        userId: payload.userId,
        date: Date.now(),
        title: payload.title,
        score: payload.score,
      };
      commentsDb.products[payload.productId].push(newComment);
      //token
      const user = getUserById(payload.userId);
      const access_token = createToken({
        username: user.username,
        password: user.password,
      });
      writeJsonFile('./src/comments.json', commentsDb);
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
