import { RoutesList } from './routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesList {}
  }
}
