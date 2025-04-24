import buildingStore from "../System/Lib/Widgets";


const codeSample = `
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The location to get the weather for, e.g. San Francisco, CA"
            },
            "format": {
              "type": "string",
              "description": "The format to return the weather in, e.g. 'celsius' or 'fahrenheit'",
              "enum": [
                "celsius",
                "fahrenheit"
              ]
            }
          },
          "required": [
            "location",
            "format"
          ]
        }
      }
    }
  ]
}`;

export interface Chat {
  role: string;
  content: string;
}

const useAdbrief = buildingStore(
  'ai',
  {
    system: '',
    code: codeSample,
    chat: '',
    working: false,
    history: [] as Chat[],
    configChart: [
      {
        title: {
          text: 'Total Transaksi per Provinsi',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'hadow'
          }
        },
        xAxis: {
          type: 'category',
          data: [
            'BALI',
            'DKI JAKARTA',
            'JAWA BARAT'
          ],
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: 'Total Transaksi'
        },
        series: [
          {
            type: 'bar',
            data: [19623, 53182, 353623],
            barMaxWidth: 40,
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            }
          }
        ]
      }
    ],
  },
  {
    init: (state, { payload }) => {
      state.system = payload;
      state.history = [{
        role: "system",
        content: payload
      }, 
      // {
      //   role: "user",
      //   content: "Jika pertanyaan bersifat umum maka jawab saja dengan sewajarnya, apakah kamu faham ?"
      // }, 
      // {
      //   role: "assistant",
      //   content: "Ya saya faham, silahkan ajukan pertanyaan."
      // },
    ];
    },
    setConfigChart: (state, { payload }) => ({
      ...state,
      configChart: payload,
      history: [
        ...state.history,
        {
          role: "chart",
          content: JSON.stringify(payload)
        },
      ],
    }),
    updateContentLastChat: (state, { payload }) => ({
      ...state,
      history: state.history.map((chat, index) => {
        if (index === state.history.length - 1) {
          return { ...chat, content: chat.content + payload };
        }
        return chat;
      }),
    }),
    addChat: (state, { payload }) => ({
      ...state,
      history: [
        ...state.history,
        payload,
      ],
    }),
    setWorking: (state, { payload }) => ({
      ...state,
      working: payload,
    }),
    setChat: (state, { payload }) => ({
      ...state,
      chat: payload,
    }),
    setCode: (state, { payload }) => ({
      ...state,
      code: payload,
    }),
    setSystem: (state, { payload }) => ({
      ...state,
      system: payload,
    }),
  },
  inits => {
    console.log("run init");
    fetch("http://localhost/adbrief/Ai/prompt")
      .then(v => v.text())
      .then(v => {
        inits(v);
      })
      .catch(e => console.log(e));
  },
  getState => ({
    getChat: () => getState().history,
  })
);

export default useAdbrief;