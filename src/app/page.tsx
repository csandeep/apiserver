'use client';
import React, { useEffect, useState } from 'react';
import { getAvailableStates, getResults } from './utils/services';
import ElectionResultTable from './components/ElectionResultTable';
import EmptyPage from './components/EmptyPage';
import LoadingPage from './components/LoadingPage';
import OverallResultTable from './components/OverallResultTable';
import ErrorPage from './components/ErrorPage';

export default function Home() {
  const [selectedState, setSelectedState] = useState('');
  const [availableStates, setAvailableStates] = useState([]);
  const [electionResults, setElectionResults] = useState([]);
  const [overallResults, setOverallResults] = useState(null);
  const [parties, setParties] = useState([]); // ['Democrat', 'Republican'
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [emptyPage, setEmptyPage] = useState(false);

  useEffect(() => {
    getAvailableStates().then((states) => {
      states.unshift('-- Select a State --');
      setAvailableStates(states);
      setSelectedState(states[0]);
      setEmptyPage(true);
    });
  }, []);

  const onChangeHandler = (event: any) => {
    setSelectedState(event.target.value);
    setLoading(true);
    setEmptyPage(false);
    setErrorLoading(null);
    setElectionResults([]);
    setOverallResults(null);
    setParties([]);

    getResults(event.target.value).then((response) => {
      setLoading(false);
      console.log(response);
      const { results } = response;

      if (response.status == 500) {
        setErrorLoading(results.error);
      } else {
        setElectionResults(results.results);
        setParties(results.parties);
        setOverallResults(results.overall);
      }
    });
  };

  const StateSelector = () => {
    return (
      <div className="absolute left-1/2 top-10 p-4">
        <select
          className="mx-2 rounded-md border border-gray-300 p-2"
          defaultValue={selectedState.toString()}
          onChange={onChangeHandler}
        >
          {availableStates.map((state: string, index: number) => (
            <option disabled={index === 0} key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <StateSelector />
      {emptyPage && <EmptyPage />}
      {loading && <LoadingPage />}
      {errorLoading && <ErrorPage errorLoading={errorLoading} />}
      {overallResults && (<OverallResultTable overallResults={overallResults} parties={parties} />)}
      {electionResults.length > 0 && (
        <ElectionResultTable results={electionResults} parties={parties} />
      )}
    </div>
  );
}
