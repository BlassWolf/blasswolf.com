import { describe, it } from "mocha";
import { expect } from "chai";
import DataSource from "./DataSource";
const Redis = require("ioredis-mock");

describe("DataSource Integration Test", () => {
  it("can get item", async () => {
    const rnd = Math.random();
    const redis = new Redis({
      data: {
        "items::itm_1": JSON.stringify({
          id: "itm_1",
          username: "superman" + rnd,
          email: "clark@daily.planet",
        }),
      },
    });
    const source = new DataSource({ redis });
    const item = await source.get("itm_1");
    expect(item).not.to.be.null;
    expect(item).to.have.property("id", "itm_1");
    expect(item).to.have.property("username", "superman" + rnd);
  });
  it("can create & delete item", async () => {
    const rnd = Math.random();
    const redis = new Redis();
    const source = new DataSource({ redis });
    const item = await source.create({
      username: "superman" + rnd,
      email: "clark@daily.planet",
    });
    expect(item).to.have.property("id");
    expect(item.id).to.match(/^itm_/);
    const list = await source.list();
    expect(list).to.have.length(1);
    expect(list[0]?.id).to.be.eq(item.id);
    const deletion = await source.delete(item.id);
    expect(deletion).to.be.true;
    expect(await source.list()).to.have.length(0);
    expect(await source.get(item.id)).to.be.null;
  });
});
