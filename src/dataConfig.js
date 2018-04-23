const initialConfig = {
  url: process.env.REACT_APP_DATA_API_URL,
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    type: 'count',
    args: {
      table: 'disaster_declaration_summaries',
      where: {}
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
      'fyDeclared',
      'incidentType',
      'title',
      'hash'
    ],
    where: {
      fyDeclared: {
        $in: ['2018', '2018']
      }
    }
  }
};

module.exports = {
  initialConfig,
  interactiveConfig,
  interactiveQuery
}