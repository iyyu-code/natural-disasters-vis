const initialConfig = {
  url: process.env.REACT_APP_DATA_API_URL,
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    type: 'select',
    args: {
      table: 'disaster_declaration_summaries',
      columns: [
        'state',
        'declarationDate',
        'fyDeclared',
        'disasterType',
        'incidentType',
        'title',
        'declaredCountyArea',
        'hash',
        'incidentEndDate',
        'incidentBeginDate'
      ],
      where: {
        fyDeclared: {
          $in: ['2018']
        }
      }
    }
  })
};

const interactiveConfig = {
  url: process.env.REACT_APP_DATA_API_URL,
  method: 'POST',
  contentType: 'application/json',
  data: null
};

const interactiveQuery = {
  type: 'select',
  args: {
    table: 'disaster_declaration_summaries',
    columns: [
      'state',
      'declarationDate',
      'fyDeclared',
      'disasterType',
      'incidentType',
      'title',
      'declaredCountyArea',
      'hash',
      'incidentEndDate',
      'incidentBeginDate'
    ],
    where: {
      fyDeclared: {
        $in: ['2013', '2016']
      }
    }
  }
};

module.exports = {
  initialConfig,
  interactiveConfig,
  interactiveQuery
}