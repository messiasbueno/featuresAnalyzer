const readXlsx = require('read-excel-file/node');
const WorkItemType = require('./src/WorkItemType.js');
const WorkItem = require('./src/WorkItem.js');

readXlsx('./Data.xlsx').then((rows) => {
  const listWorkItem = prepareWorkItem(rows);
  const dataProfit = generateData(listWorkItem);
  const listErrors = validateWorkItem(listWorkItem);

  console.table(dataProfit);
  console.table(listErrors);
})

function loadTitles(titles) {
  return {
    idWorkItem: titles.indexOf('ID'),
    workItemType: titles.indexOf('Work Item Type'),
    title: titles.indexOf('Title'),
    originalEstimate: titles.indexOf('Original Estimate'),
    analysisEstimate: titles.indexOf('EstimativaDeAnalise'),
    developmentEstimate: titles.indexOf('Desenv Estimate'),
    homologationEstimate: titles.indexOf('EstimativaDeHomologacao'),
    remainingWork: titles.indexOf('Remaining Work'),
    spentWork: titles.indexOf('Tempo gasto')
  }
}

function prepareWorkItem(rows) {
  const listWorkItem = [];
  const titles = rows.shift();
  const indexTitles = loadTitles(titles);

  let workItem;
  for (let index = 0; index < rows.length; index++) {
    let row = rows[index];
    if (row[indexTitles.workItemType] == WorkItemType.feature) {
      workItem = new WorkItem();
      workItem.originalEstimate = row[indexTitles.originalEstimate]
    } else if (row[indexTitles.workItemType] == WorkItemType.nf) {
      workItem.idWorkItem = row[indexTitles.idWorkItem];
      workItem.title = row[indexTitles.title];
      workItem.spentWorkNF = row[indexTitles.spentWork];
      workItem.timeEstimateAnalysis = row[indexTitles.analysisEstimate];
      workItem.timeEstimateDevelopment = row[indexTitles.developmentEstimate];
      workItem.timeEstimateHomologation = row[indexTitles.homologationEstimate];
    } else if (row[indexTitles.workItemType] == WorkItemType.analysis) {
      workItem.remainingWorkAnalysis += row[indexTitles.remainingWork];
      workItem.spentWorkAnalysis += row[indexTitles.spentWork];
    } else if (row[indexTitles.workItemType] == WorkItemType.homologation) {
      workItem.remainingWorkHomologation += row[indexTitles.remainingWork];
      workItem.spentWorkHomologation += row[indexTitles.spentWork];
    } else {
      workItem.remainingWorkDevelopment += row[indexTitles.remainingWork];
      workItem.spentWorkDevelopment += row[indexTitles.spentWork];
    }

    if (row[indexTitles.workItemType] != WorkItemType.nf) {
      workItem.spentWork += row[indexTitles.spentWork];
    }

    workItem.remainingWork += row[indexTitles.remainingWork];

    const next = index + 1;
    const nextLine = rows[next];

    if ((next == rows.length) || (nextLine[indexTitles.workItemType] == WorkItemType.feature)) {

      listWorkItem.push(workItem);
    }
  }

  return listWorkItem;
}

function generateData(listWorkItem) {
  const dataProfit = new Object;
  processGeneral(dataProfit, listWorkItem);
  processSector(dataProfit, listWorkItem, 'Analysis');
  processSector(dataProfit, listWorkItem, 'Development');
  processSector(dataProfit, listWorkItem, 'Homologation');

  return dataProfit;
};

function processGeneral(dataProfit, listWorkItem) {
  dataProfit.general = {};
  dataProfit.general.totalEstimatedTime = listWorkItem
    .map(workItem => workItem.originalEstimate)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  dataProfit.general.totalRemainingWork = (0).toFixed(2);

  dataProfit.general.totalSpentWork = listWorkItem
    .map(workItem => (workItem.spentWork))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  dataProfit.general.accumulatedProfit = ((1 - (dataProfit.general.totalSpentWork / dataProfit.general.totalEstimatedTime)) * 100).toFixed(2);

  dataProfit.general.totalSpentWorkNF = listWorkItem
    .map(workItem => (workItem.spentWorkNF))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  dataProfit.general.accumulatedProfitNF = ((1 - (dataProfit.general.totalSpentWorkNF / dataProfit.general.totalEstimatedTime)) * 100).toFixed(2);
};

function processSector(dataProfit, listWorkItem, sector) {
  const sectorLower = sector.toLowerCase();
  dataProfit[sectorLower] = {};
  dataProfit[sectorLower].totalEstimatedTime = listWorkItem
    .map(workItem => (workItem[`timeEstimate${sector}`]))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  dataProfit[sectorLower].totalRemainingWork = listWorkItem
    .map(workItem => (workItem[`remainingWork${sector}`]))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  dataProfit[sectorLower].totalSpentWork = listWorkItem
    .map(workItem => (workItem[`spentWork${sector}`]))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  const totalSpentWork = parseFloat(dataProfit[sectorLower].totalSpentWork);
  const totalRemainingWork = parseFloat(dataProfit[sectorLower].totalRemainingWork);

  dataProfit[sectorLower].accumulatedProfit = (
    ((totalSpentWork + totalRemainingWork) / dataProfit[sectorLower].totalEstimatedTime) * 100
  ).toFixed(2);
}

function validateWorkItem(listWorkItem) {
  const errors = [];

  listWorkItem.forEach(workItem => {
    const error = {
      idWorkItem: undefined,
      message: []
    };

    if (!workItem.timeEstimateAnalysis) {
      error.message.push(`Não possui estimativa de análise`);
    }
    if (!workItem.timeEstimateDevelopment) {
      error.message.push(`Não possui estimativa de desenvolvimento`);
    }
    if (!workItem.timeEstimateAnalysis) {
      error.message.push(`Não possui estimativa de homologação`);
    }

    if (error.message.length > 0) {
      error.idWorkItem = workItem.idWorkItem;
      errors.push(error);
    }
  });

  return errors;
};


