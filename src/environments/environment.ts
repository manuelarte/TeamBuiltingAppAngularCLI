// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  prefix: 'api',
  core: 'core',
  statistics: 'statistics',
  experience: 'experience',

  backendTeamsUrl: `http://localhost:8090/teams`,
  backendPlayersUrl: `http://localhost:8091`,
  backendSportsUrl: `http://localhost:8092/sports`,
  backendStatisticsUrl: `http://localhost:8081/statistics`, // dev
  backendExperienceUrl: `http://localhost:8082/experience`, // dev
  backendUsersUrl: `http://localhost:8090`,

};
