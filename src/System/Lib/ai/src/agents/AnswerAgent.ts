import Orchestrator from "../engine/Orchestrator";
import AbstractAgent from "./AbstractAgent";
import AgentProps from "./AgentProps";

export default class AnswerAgent extends AbstractAgent {
  name: string = "agen_penjawab";

  addCore(core: Orchestrator): AbstractAgent {
    this.core = core;
    return this;
  }

  addData(data: AgentProps) {
    this.data = data;
  }

  run(): Promise<string> {
    return Promise.resolve(this.data!.message);
  }
}
