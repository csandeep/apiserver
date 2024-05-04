import { partyColors } from '../utils/helpers';

// @ts-ignore
export default function OverallResultTable({ overallResults, parties }) {
  return (
    <div className="mt-6 flex w-full max-w-md flex-col space-y-8">
      <h2 className="text-xl font-semibold">Overall Results</h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-400">
          <tr>
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
          <tr key="overall">
            {parties.map((party: string) => (
              <td
                key={party}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                {overallResults[party]['candidate']} ({overallResults[party]['votes']})
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
