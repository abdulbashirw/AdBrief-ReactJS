import AnswerAgent from "./agents/AnswerAgent";
import ChartAgent from "./agents/ChartAgent";
import RangkumanAgent from "./agents/RangkumanAgent";
import SqlAgent from "./agents/SqlAgent";
import Orchestrator from "./engine/Orchestrator";

// Eng-Smart-Agent
const orchestrator = new Orchestrator();
orchestrator.addAgent(new AnswerAgent());
orchestrator.addAgent(new SqlAgent());
orchestrator.addAgent(new RangkumanAgent());
orchestrator.addAgent(new ChartAgent());

// orchestrator.process().then(res => console.log(res));

orchestrator.ask("tabel seperti apa yang kamu miliki?").then((response) => {
  const jsonResponse = response.parseTextOutputToJson();
  if (jsonResponse == null) {
    console.log(response.getResponse());
    return;
  }
  console.log(jsonResponse);
  console.log("========================================================");
  console.log("========================================================");
  console.log("========================================================");
  orchestrator.setData(response.parseTextOutputToJson());
  orchestrator.process().then((response) => {
    console.log(response);
  });
});
