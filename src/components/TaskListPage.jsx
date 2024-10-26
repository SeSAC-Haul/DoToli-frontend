import React from 'react';
import useTaskFilter from '../hooks/useTaskFilter';
import { Search, Filter, X } from 'lucide-react';
import TaskList from "./TaskList.jsx";
import FilterModal from '../pages/FilterModal.jsx';

const SearchBar = ({ value, onChange, onSearch, onReset }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length >= 2) {
      onSearch(value);
    } else if (value.trim().length === 1) {
      alert('검색어를 2글자 이상 입력해주세요.');
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (!newValue.trim()) {
      onReset();
    }
  };

  return (
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <div className="relative flex items-center">
          <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="할 일 검색 (2글자 이상)"
              className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {value && (
                <button
                    type="button"
                    onClick={() => {
                      onChange('');
                      onReset();
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4"/>
                </button>
            )}
            <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              검색
            </button>
          </div>
        </div>
      </form>
  );
};

const FilterButton = ({ onClick, activeFilterCount }) => (
    <button
        onClick={onClick}
        className="relative px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
    >
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-500 group-hover:text-gray-700"/>
        {activeFilterCount > 0 && (
            <span className="ml-2 text-sm font-medium text-blue-600">
          {activeFilterCount}
        </span>
        )}
      </div>
    </button>
);

const TaskListPage = ({
                        title,
                        tasks,
                        content,
                        handleContentChange,
                        handleAddTask,
                        handleTaskToggle,
                        handleTaskDelete,
                        handleTaskEdit,
                        handleFilterApply,
                        handleResetFilters,
                        isFiltered,
                        isLoading,
                        teamId,
                        children
                      }) => {
  const {
    filterOptions,
    isFilterModalOpen,
    setIsFilterModalOpen,
    handleFilterChange,
    handleFilterApply: applyFilter,
    cancelReset,
    isPendingReset,
    activeFilterCount,
    appliedFilters,
    keyword,
    setKeyword,
    resetAllFilters
  } = useTaskFilter(teamId);

  const handleApplyFilter = async () => {
    const filters = await applyFilter();
    if (handleFilterApply) {
      await handleFilterApply(filters);
    }
    setIsFilterModalOpen(false);
  };

  const handleSearch = async (searchText) => {
    const filters = appliedFilters ? {
      ...appliedFilters,
      keyword: searchText
    } : {
      ...filterOptions,
      keyword: searchText
    };

    if (handleFilterApply) {
      await handleFilterApply(filters);
    }
  };

  const handleModalClose = () => {
    if (isPendingReset) {
      cancelReset();
    }
    setIsFilterModalOpen(false);
  };

  const handleResetSearch = async () => {
    setKeyword('');
    if (appliedFilters) {
      const filters = {
        ...appliedFilters,
        keyword: ''
      };
      await handleFilterApply(filters);
    } else {
      handleResetFilter();
    }
  };

  const handleResetFilter = async () => {
    resetAllFilters();
    if (handleResetFilters) {
      await handleResetFilters();
    }
    setIsFilterModalOpen(false);
  };

  return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex space-x-2">
            <SearchBar
                value={keyword || ''}
                onChange={setKeyword}
                onSearch={handleSearch}
                onReset={handleResetSearch}
            />
            <FilterButton
                onClick={() => setIsFilterModalOpen(true)}
                activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        <FilterModal
            isOpen={isFilterModalOpen}
            onClose={handleModalClose}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            isPendingReset={isPendingReset}
            onCancelReset={cancelReset}
            activeFilters={appliedFilters}
        />

        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
              {(isFiltered || appliedFilters || keyword) && (
                  <span className="text-sm text-blue-600">
                {keyword ? '검색 결과' : '필터가 적용되었습니다'}
              </span>
              )}
            </div>

            <form onSubmit={handleAddTask} className="mb-6">
              <div className="flex items-center">
                <input
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                    required
                    className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="새로운 할 일을 입력하세요"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  추가
                </button>
              </div>
            </form>

            {isLoading ? (
                <div className="text-center py-8">
                  <div
                      className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  {keyword ? '검색 결과가 없습니다' : '할 일이 없습니다'}
                </div>
            ) : (
                <TaskList
                    tasks={tasks}
                    onTaskToggle={handleTaskToggle}
                    onTaskDelete={handleTaskDelete}
                    onTaskEdit={handleTaskEdit}
                />
            )}
          </div>

          {children && (
              <div className="bg-white rounded-lg shadow-md p-4">
                {children}
              </div>
          )}
        </div>
      </div>
  );
};

export default TaskListPage;
