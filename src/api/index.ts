import DataSource from "./DataSource";
import context from "./context";
import core from "./core";
import api from "./middleware";

const dataSources: Record<
  keyof typeof core.dataSources,
  DataSource<any>
> = {} as any;

for (let dataSource in core.dataSources) {
  dataSources[dataSource] = new core.dataSources[dataSource](context);
}
export default api(core.resolvers, {
  ...context,
  ...dataSources,
  log: console,
});
