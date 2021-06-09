import React, { useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch, useRouteMatch } from 'react-router';
import ListProduct from './listProduct';
import AddProduct from './addEditProduct';

const ProductsManage = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${path}/listProduct`} />
      </Route>
      <Route path={`${path}/listProduct/:page?`}>
        <ListProduct url={url} />
      </Route>
      <Route key='add-product' path={`${path}/addProduct/`}>
        <AddProduct />
      </Route>
      <Route
        key='edit-product'
        path={`${path}/editProduct/:productTitle`}
        component={AddProduct}
      />
    </Switch>
  );
};

export default ProductsManage;
