'use client';

import { partyColors } from '../utils/helpers';

// @ts-ignore
export default function ElectionResultTable({ results, parties }) {
  return (
    <div className="mt-6 flex w-full max-w-md flex-col space-y-8 pb-8">
      <h2 className="text-xl font-semibold">Election Results</h2>
      <table className="w-full table-auto">
        <thead className="bg-transparent">
          <tr>
            <th className="bg-transparent px-4 py-2"></th>
            {parties.map((party: string) => (
              <th
                key={party}
                className={`${partyColors.hasOwnProperty(party) && partyColors[party]} border border-gray-300 px-4 py-2 text-center`}
              >
                {party}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((county_result: any) => (
            <tr key={county_result.county}>
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                {county_result.county}
              </td>
              {parties.map((party: string) => (
                <td
                  key={party}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {county_result.results.hasOwnProperty(party) && county_result.results[party]['candidate']} (
                  {county_result.results.hasOwnProperty(party) && county_result.results[party]['votes']})
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
