import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshRate } from "@/redux/slices/refreshRateSlice";
import { RootState } from "@/redux/store";
import Layout from "@/components/Layout";

// TODO: separate into different components by pages
const PreferencesPage: React.FC = () => {
  const refreshRate = useSelector(
    (state: RootState) => state.refreshRate.value
  );
  const dispatch = useDispatch();

  return (
    <div
      className='max-w-xl mx-auto
p-6 bg-white rounded-lg shadow-md'
    >
      <h2 className='text-lg font-semibold text-gray-800'>Preferences</h2>
      <div className='mt-4'>
        <label htmlFor='refresh-rate' className='block text-gray-700'>
          Refresh Rate (ms):{" "}
        </label>
        {/* TODO: Fix font color in input */}
        <input
          id='refresh-rate'
          type='number'
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500'
          value={refreshRate}
          onChange={(e) => dispatch(setRefreshRate(Number(e.target.value)))}
        />
      </div>
    </div>
  );
};

export default PreferencesPage;
