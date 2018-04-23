const initialConfig = {
  url: process.env.REACT_APP_DATA_API_URL,
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
<<<<<<< HEAD
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
=======
    type: 'count',
    args: {
      table: 'disaster_declaration_summaries',
      where: {}
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
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
<<<<<<< HEAD
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
=======
      'fyDeclared',
      'incidentType',
      'title',
      'hash'
    ],
    where: {
      fyDeclared: {
        $in: ['2018', '2018']
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
      }
    }
  }
};

module.exports = {
  initialConfig,
  interactiveConfig,
  interactiveQuery
}