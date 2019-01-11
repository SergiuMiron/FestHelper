const apikey = 'kjdbaslkeuho23i8ur4sdbfi872y4087ghewjfbsadlkjfrhgo8i3274yhbfw';

async function generateTest(context) {
  const numQuestions = parseInt(context.params.query.numQuestions || context.data.numQuestions);
  const difficulty = context.params.query.difficulty || context.data.difficulty;
  const disciplines = context.params.query.disciplines || context.data.disciplines;

  const questions = await context.app.service('questions').find({
    query: {
      $limit: numQuestions,
      difficulty: difficulty,
      discipline: {
        $in: disciplines
      },
      type: 'choice'
    }
  });

  if (questions.data.length < numQuestions) {
    throw new Error('Could not find enough questions filtered by difficulty and discipline');
  }
  context.data.questions = questions.data;
  context.data.status = 'available';
  context.data.points = null;
  let maxPoints = 0;
  context.data.questions.forEach((q) => {
    maxPoints += q.points;
  });
  context.data.maxPoints = maxPoints;

  return context;
}

async function validateTest(context) {
  const status = context.params.query.status || context.data.status;
  const answers = context.params.query.answers || context.data.answers;

  const test = await context.app.service('tests').get(context.id, {apikey: apikey});

  if(test) {
    if (status === 'started' && test.status !== 'available') {
      throw new Error('Test already started or submitted');
    } else if (status === 'submitted' && test.status !== 'started') {
      throw new Error('Test already submitted or not started yet');
    } else if (answers && status !== 'submitted') {
      throw new Error('Test allows answers only when status sent as submitted');
    } else if (status === 'submitted' && test.status === 'started') {
      let points = 0;
      test.questions.forEach((q, i) => {
        if (answers[i] === q.answer[0]) {
          points += q.points;
        }
      });
      context.data.points = points;
    }
  }
}

async function obfuscateTest(context) {
  if(context.params.apikey !== apikey) {
    const questions = context.result.questions;
    context.result.questions  = questions.map((q) => {
      return {
        title: q.title,
        type: q.type,
        discipline: q.discipline,
        difficulty: q.difficulty,
        choices: q.choices,
        points: q.points
      }
    });
  }
}

async function obfuscateTests(context) {
  if(context.params.apikey !== apikey) {
    const questions = context.result.questions;
    context.result.data = context.result.data.map((r) => {
      return {
        title: r.title,
        campaignName: r.campaignName,
        numQuestions: r.numQuestions,
        difficulty: r.difficulty,
        disciplines: r.disciplines,
        status: r.status,
        points: r.points,
        maxPoints: r.maxPoints,
        questions: r.questions.map((q) => {
          return {
            title: q.title,
            type: q.type,
            discipline: q.discipline,
            difficulty: q.difficulty,
            choices: q.choices,
            points: q.points
          }
        }),
        _id: r._id,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      }
    })

  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [generateTest],
    update: [validateTest],
    patch: [validateTest],
    remove: []
  },

  after: {
    all: [obfuscateTests],
    find: [obfuscateTests],
    get: [obfuscateTest],
    create: [obfuscateTest],
    update: [obfuscateTest],
    patch: [obfuscateTest],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
