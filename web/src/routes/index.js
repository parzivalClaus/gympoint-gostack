import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '../pages/Sign';

import Students from '../pages/Students';
import RegisterStudent from '../pages/RegisterStudent';
import Plans from '../pages/Plans';
import RegisterPlans from '../pages/RegisterPlans';
import Registrations from '../pages/Registrations';
import Register from '../pages/Register';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/register-student" component={RegisterStudent} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/register-plans" component={RegisterPlans} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/register" component={Register} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="/" component={() => <h1>404 - Página não encontrada</h1>} />
    </Switch>
  );
}
