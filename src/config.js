// @ts-check
const zod = require('zod');
// @ts-ignore
var fs = require('fs');

const Config = zod.object({
  RESULTS_JSON_FILE: zod.string({
    required_error:
      'define a RESULTS_JSON variabel in .env file, this should be a full path to the file.',
    invalid_type_error: 'the data should be an valid json object.',
    message:
      'define a RESULTS_JSON variabel in .env file, this should be a full path to the file.',
  }),
});

const result = Config.safeParse({
  RESULTS_JSON_FILE: process.env.RESULTS_JSON_FILE,
});

if (!result.success) {
  const formatted = result.error.format();

  console.error(formatted.RESULTS_JSON_FILE?._errors.join('\n'));
  process.exit(1);
}

// check if this is a valid json file and load the file into memory
try {
  // @ts-ignore
  const a = require(process.env.RESULTS_JSON_FILE);
} catch (e) {
  console.error(`${process.env.RESULTS_JSON_FILE} is not a valid json`);
  process.exit(1);
}
