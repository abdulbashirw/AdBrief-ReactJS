import Orchestrator from "../engine/Orchestrator";
import AgentProps from "./AgentProps";

export default abstract class AbstractAgent {
    name: string = "default_agent";
    message: string = "";
    data: AgentProps | undefined;
    core: Orchestrator | undefined;

    addCore(core: Orchestrator): AbstractAgent {
        this.core = core;
        return this;
    }

    addData(data: AgentProps): void {
        this.data = data;
    }

    abstract run(params?: any): Promise<any>;
}
