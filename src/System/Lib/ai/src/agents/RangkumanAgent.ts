import Engine from "../engine/engine";
import Orchestrator from "../engine/Orchestrator";
import AbstractAgent from "./AbstractAgent";
import AgentProps from "./AgentProps";

export default class RangkumanAgent extends AbstractAgent {
  name: string = "agen_rangkuman";

  addCore(core: Orchestrator): AbstractAgent {
    this.core = core;
    return this;
  }

  addData(data: AgentProps) {
    this.data = data;
  }

  async run(params: any): Promise<string> {
    const engine = new Engine();

    console.log("params", params);
    const agen_rangkuman = this.core?.getAgent("agen_rangkuman");
    console.log("agen_rangkuman", agen_rangkuman);
    const message = agen_rangkuman!.data!.message;
    console.log("message", message);

    engine.setSystemMessage(
      [
        "Tugas kamu adalah melengkapi kalimat yang saya berikan dengan data.",
        "Cukup melengkapi variabelnya saja, jangan di tambah atau dikurangi.",
        "Jika memang memungkinkan datanya bervariatif, kamu bisa tampilkan dalam bentul list.",
        "",
        "Data:",
        JSON.stringify(params),
        "",
      ].join("\n"),
    );

    const result = await engine.prompt(message || "");
    return result.getResponse() || "";
  }
}
