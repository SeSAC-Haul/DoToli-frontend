import { useState } from 'react';

const useTaskFilter = (teamId = null) => {
  const initialFilterOptions = {
    startDate: '',
    endDate: '',
    deadline: '',
    flag: false,
    done: false,
    keyword: ''
  };

  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isPendingReset, setIsPendingReset] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [keyword, setKeyword] = useState('');

  const handleFilterChange = (name, value) => {
    setIsPendingReset(false);
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetRequest = () => {
    setIsPendingReset(true);
    setFilterOptions(initialFilterOptions);
    setAppliedFilters(null);
    setKeyword('');
  };

  const cancelReset = () => {
    setIsPendingReset(false);
    if (appliedFilters) {
      setFilterOptions(appliedFilters);
    }
  };

  const formatDateForServer = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('sv').split('T')[0]; // sv locale은 'YYYY-MM-DD' 형식을 반환
  };

  const handleFilterApply = async () => {
    const filters = {};

    if (filterOptions.startDate) {
      filters.startDate = formatDateForServer(filterOptions.startDate);
    }
    if (filterOptions.endDate) {
      filters.endDate = formatDateForServer(filterOptions.endDate);
    }
    if (filterOptions.deadline) {
      filters.deadlineStr = formatDateForServer(filterOptions.deadline);
    }

    if (filterOptions.flag) filters.flag = true;
    if (filterOptions.done) filters.done = true;

    if (keyword?.trim()) {
      filters.keyword = keyword.trim();
    }

    const currentFilters = {
      ...filterOptions,
      keyword: keyword.trim()
    };

    setAppliedFilters(currentFilters);
    setIsFilterModalOpen(false);
    setIsPendingReset(false);
    return filters;
  };

  const getActiveFilterCount = () => {
    if (!appliedFilters) return 0;

    return Object.entries(appliedFilters).filter(([key, value]) => {
      if (key === 'keyword') return value?.trim() !== '';
      if (typeof value === 'boolean') return value === true;
      return value !== '' && value !== null && value !== undefined;
    }).length;
  };

  const resetAllFilters = () => {
    setFilterOptions(initialFilterOptions);
    setAppliedFilters(null);
    setKeyword('');
    setIsPendingReset(false);
  };

  return {
    filterOptions,
    isFilterModalOpen,
    setIsFilterModalOpen,
    handleFilterChange,
    handleFilterApply,
    handleResetRequest,
    cancelReset,
    isPendingReset,
    activeFilterCount: getActiveFilterCount(),
    appliedFilters,
    keyword,
    setKeyword,
    resetAllFilters
  };
};

export default useTaskFilter;
