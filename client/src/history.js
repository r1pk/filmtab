import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ window, basename: process.env.PUBLIC_URL });
