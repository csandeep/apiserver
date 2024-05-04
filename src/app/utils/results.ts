// @ts-nocheck
import fs from 'fs';
import { deepMap } from './mapUtils';

var RESULTS: Map<string, any>;

/**
 * loadResults - Load the results from the JSON file
 *
 * @returns {Map<string, any>}
 */
export function loadResults() {
  if (RESULTS) {
    // uncomment this to cache the results
    // return RESULTS;
  }

  const _result = JSON.parse(
    fs.readFileSync(process.env.RESULTS_JSON_FILE, 'utf8'),
  );

  RESULTS = deepMap(_result);

  return RESULTS;
}

/**
 * getResults - Get the winners by county and overall winner given a state name.
 * @param state
 * @returns {Object<string, any>}
 * @throws {Error} - If the state results are not found
 */
export function getResults(state: string) {
  let results = [], // Store the results by county
    by_party = {}, // Store the results by party
    state_results = loadResults()?.get(state),
    parties = new Set([]);

  if (!state_results) {
    throw new Error(`${state} results were not found!`);
  }

  // Iterate over the counties
  for (const county of state_results.keys()) {
    const county_results = state_results.get(county);
    let county_by_party = {}; // Store the winner by party for the county

    // Iterate over the parties
    county_results.forEach(
      (party_results: Map<string, Object>, party: string) => {
        parties.add(party);

        // Store the results of winner per county by party
        let county_winner: { candidate: string; votes: number } = {
          candidate: '',
          votes: 0,
        };

        // Iterate over the candidates that ran in this county for this party
        party_results.forEach((votes, candidate) => {
          if (by_party[party] && by_party[party][candidate]) {
            by_party[party][candidate] += votes;
          } else {
            // preserve the votes for the candidates that we had seen earlier
            const obj = by_party[party] || {};
            obj[candidate] = votes;
            by_party[party] = obj;
          }

          if (county_winner.candidate === '') {
            // prime the county winner object if it's empty
            county_winner = { candidate, votes };
          } else if (county_winner.votes < votes) {
            county_winner = { candidate, votes }; // we found a new winner
          }
        });

        // Store the winner for the party in this county
        county_by_party[party] = county_winner;
      },
    );

    results.push({ county, results: county_by_party });
  }

  const overall = {}; // Store the overall winner by party

  const by_party_results = deepMap(by_party);

  // Iterate over the results by party for all the candidates across counties
  by_party_results.forEach((party_results, party) => {
    let winner: { candidate: string; votes: number } = {
      candidate: '',
      votes: 0,
    };

    party_results.forEach((votes: number, candidate: string) => {
      if (winner.candidate === '') {
        // prime the winner object if it's empty
        winner = { candidate, votes };
      } else if (winner.votes < votes) {
        winner = { candidate, votes }; // we found a new winner
      }
    });

    overall[party] = winner;
  });

  return {
    results: results.sort((a, b) => a.county.localeCompare(b.county)),
    overall,
    parties,
  };
}
