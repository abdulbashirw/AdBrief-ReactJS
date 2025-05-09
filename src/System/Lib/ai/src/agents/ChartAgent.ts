import Engine from '../engine/engine'
import Orchestrator from '../engine/Orchestrator'
import AbstractAgent from './AbstractAgent'
import AgentProps from './AgentProps'

export default class ChartAgent extends AbstractAgent {
  name: string = 'agent_chart'

  addData(data: AgentProps) {
    this.data = data
  }

  addCore(core: Orchestrator): AbstractAgent {
    this.core = core
    return this
  }

  async run() {
    const engine = new Engine()
    engine.setSystemMessage(
      [
        `
Tugas kamu adalah membuat kode untuk menampilkan chart dari data yang ada dengan menggunakan library echarts.

Contoh.

Pertanyaan:
buatkan data chart dari data ini:
[{"kota":"KOTA DENPASAR","total_transaksi":"13478"},{"kota":"BADUNG","total_transaksi":"3978"},{"kota":"TABANAN","total_transaksi":"921"},{"kota":"GIANYAR","total_transaksi":"691"},{"kota":"BULELENG","total_transaksi":"346"},{"kota":"KARANGASEM","total_transaksi":"94"},{"kota":"JEMBRANA","total_transaksi":"63"},{"kota":"KLUNGKUNG","total_transaksi":"51"},{"kota":"BANGLI","total_transaksi":"1"}]
Kita menggunakan echarts, dan saya menginginkan options setingnya saja, jawab langsung ke kode saja ya.

Jawaban: 
\`\`\`json
{
  "title": {
    "text": "Total Transaksi per Kota",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "shadow"
    }
  },
  "xAxis": {
    "type": "category",
    "data": [
      "KOTA DENPASAR",
      "BADUNG",
      "TABANAN",
      "GIANYAR",
      "BULELENG",
      "KARANGASEM",
      "JEMBRANA",
      "KLUNGKUNG",
      "BANGLI"
    ],
    "axisLabel": {
      "rotate": 45
    }
  },
  "yAxis": {
    "type": "value",
    "name": "Total Transaksi"
  },
  "series": [
    {
      "type": "bar",
      "data": [13478, 3978, 921, 691, 346, 94, 63, 51, 1],
      "barMaxWidth": 40,
      "itemStyle": {
        "borderRadius": [4, 4, 0, 0]
      }
    }
  ]
}`,
        '```',
        '',
        'Note:',
        '- Gunakan title pendek saja paling panjang 3 kata.',
        '- Gunakan chart lain :',
        'chart_instruction:',
        JSON.stringify(this.data!.chart_instruction),
      ].join('\n'),
    )

    const result = await engine.prompt('Create config options for echarts from data.')
    console.log('result.parseTextOutputToJson()', result.parseTextOutputToJson())
    return result.parseTextOutputToJson()
  }
}
