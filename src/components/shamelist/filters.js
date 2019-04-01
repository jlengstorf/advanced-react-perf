import React from 'react';
import { LANGUAGES, TYPES } from '../../constants';
import { useShamecaps } from '../../context/shamecaps';
import Select from '../select/select';

const Filters = ({ totalCount }) => {
  const { filters, setFilters } = useShamecaps();

  return (
    <nav className="filters">
      <span>
        {totalCount} shamecap{totalCount === 1 || 's'}
      </span>
      <section>
        Filter the shame:
        <Select
          label="Language"
          unselectedOption="All Languages"
          unselectedOptionValue="all"
          options={LANGUAGES}
          defaultValue={filters.language}
          handleChange={e => setFilters({ language: e.target.value })}
          hideLabel
        />
        <Select
          label="Type"
          unselectedOption="All Types"
          unselectedOptionValue="all"
          options={TYPES}
          defaultValue={filters.type}
          handleChange={e => setFilters({ type: e.target.value })}
          hideLabel
        />
      </section>
    </nav>
  );
};

export default Filters;
