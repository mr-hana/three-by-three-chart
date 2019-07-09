const CenterKey = 5;
const Positions = ['topLeft', 'topCenter', 'topRight', 'middleLeft', 'middleCenter', 'middleRight', 'bottomLeft', 'bottomCenter', 'bottomRight'];

const isCenter = key => CenterKey === key;
const createInitialState = (centerValue = '') => {
  return {
    selectedKey: CenterKey,
    parentKey: CenterKey,
    charts: [{
      topLeft: { key: 1, value: '' },
      topCenter: { key: 2, value: '' },
      topRight: { key: 3, value: '' },
      middleLeft: { key: 4, value: '' },
      middleCenter: { key: CenterKey, value: centerValue },
      middleRight: { key: 6, value: '' },
      bottomLeft: { key: 7, value: '' },
      bottomCenter: { key: 8, value: '' },
      bottomRight: { key: 9, value: '' },
    }]
  };
}

export const initialState = createInitialState();
export const reducers = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CONTENT':
      let newChart = { ...getters(state).getSelectedChart() };
      newChart[action.payload.position].value = action.payload.value;
      return {
        ...state,
        charts: state.charts.map(item => {
          return item.middleCenter.key === state.selectedKey ? newChart : item;
        }),
      };
    case 'SELECT_CHART':
      const selectedKey = action.payload.selectedKey;
      const chart = getChart(state.charts, selectedKey);
      let parentKey = CenterKey;
      if (!isCenter(selectedKey)) {
        const parent = findParent(state.charts, selectedKey);
        parentKey = parent.middleCenter.key;
      }

      if (chart) {
        return {
          ...state,
          selectedKey: selectedKey,
          parentKey: parentKey
        };
      }

      const maxKey = getMaxKey(state.charts);
      let selectedChart = getChart(state.charts, selectedKey);
      if (selectedChart == null) {
        selectedChart = findParent(state.charts, selectedKey);
      }
      const middleCenter = getContent(selectedChart, selectedKey);
      let addChart = createChart(middleCenter, maxKey + 1);
      return {
        ...state,
        selectedKey: selectedKey,
        parentKey: state.selectedKey,
        charts: [...state.charts, addChart]
      };
    case 'INIT_CHART':
      const newState = createInitialState(action.payload.keyword);
      return { ...newState };
    default:
      return state;
  }
}

export const dispatchers = dispatch => {
  return {
    changeContent: (position, value) => {
      dispatch({
        type: 'CHANGE_CONTENT',
        payload: { position, value }
      });
    },
    selectChart: selectedKey => {
      dispatch({ type: 'SELECT_CHART', payload: { selectedKey: selectedKey } });
    },
    selectCenterOfCharts: () => {
      dispatch({ type: 'SELECT_CHART', payload: { selectedKey: CenterKey } });
    },
    initChart: keyword => {
      dispatch({ type: 'INIT_CHART', payload: { keyword: keyword } });
    }
  };
}

export const getters = state => {
  return {
    getPositions: () => {
      return Positions;
    },
    getSelectedChart: () => {
      return getChart(state.charts, state.selectedKey);
    },
    isCreation: () => {
      const centerChart = getChart(state.charts, CenterKey);
      return centerChart.middleCenter.value !== '';
    },
    generateRandomChart: () => {
      const contents = extractContents(state.charts);
      const keys = [...contents.keys()];
      const selection = takeRandom(keys, Positions.length);
      const randomChart = {};
      for (let i = 0; i < Positions.length; i++) {
        const position = Positions[i];
        const contentIndex = selection[i];
        randomChart[position] = contents.get(contentIndex);
      }

      return randomChart;
    }
  };
}

const getChart = (charts, middleCenterKey) => {
  return charts.find(item => item.middleCenter.key === middleCenterKey);
}

const getContent = (chart, key) => {
  for (const position of Positions) {
    if (chart[position].key === key) {
      return chart[position];
    }
  }

  return null;
}

const findParent = (charts, key) => {
  for (const chart of charts) {
    if (chart.middleCenter.key === key) {
      continue;
    }

    const content = getContent(chart, key);
    if (content) {
      return chart;
    }
  }

  return null;
}

const createChart = (middleCenter, initialKey) => {
  let key = initialKey;
  return {
    topLeft: { key: key++, value: '' },
    topCenter: { key: key++, value: '' },
    topRight: { key: key++, value: '' },
    middleLeft: { key: key++, value: '' },
    middleCenter: { key: middleCenter.key, value: middleCenter.value },
    middleRight: { key: key++, value: '' },
    bottomLeft: { key: key++, value: '' },
    bottomCenter: { key: key++, value: '' },
    bottomRight: { key: key++, value: '' },
  };
}

const getMaxKey = charts => {
  const chartWithMaxKey = charts.reduce((a, b) => Math.max(a.bottomRight, b.bottomRight) ? a : b);
  return chartWithMaxKey.bottomRight.key;
}

const extractContents = charts => {
  const contents = new Map();
  for (const chart of charts) {
    for (const position of Positions) {
      const content = chart[position];
      if (contents.has(content.key)) {
        continue;
      }

      contents.set(content.key, content);
    }
  }

  return contents;
}

const takeRandom = (array, number) => {
  const original = array.slice();
  const selection = [];

  while (selection.length < number && original.length > 0) {
    const randomIndex = Math.floor(Math.random() * original.length);
    selection.push(original[randomIndex]);
    original.splice(randomIndex, 1);
  }

  return selection;
}