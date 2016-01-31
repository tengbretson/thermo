import React from 'react';
import { Router } from 'express';
import { match, RoutingContext } from 'react-router'
import { join } from 'path';
import { renderToString } from 'react-dom/server';
import { routes } from '../public/router';

const router = Router();

router.get('*', ({ url }, res) => {
  match({ routes, location: url }, (error, redirectLocation, props) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const content = renderToString(<RoutingContext { ...props } />);
      res.render('index', { content });
    } else {
      res.status(404).send('Not found');
    }
  });
});

export { router };
