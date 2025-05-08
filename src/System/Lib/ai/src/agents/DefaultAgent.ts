import Orchestrator from "../engine/Orchestrator";
import AbstractAgent from "./AbstractAgent";

export default class DefaultAgent extends AbstractAgent {
  name: string = "default_agent";

  addCore(core: Orchestrator): AbstractAgent {
    this.core = core;
    return this;
  }

  async run() {
    const result = await Promise.resolve("Agent tidak ditemukan");
    return result;
  }
}
