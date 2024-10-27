import React from 'react';
import { Calendar, X, Check } from 'lucide-react';

const FilterModal = ({
                       isOpen,
                       onClose,
                       filterOptions,
                       onFilterChange,
                       onApply,
                       onReset,
                       isPendingReset,
                       onCancelReset,
                       activeFilters
                     }) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ActiveFilters = () => {
    if (!activeFilters) return null;

    const activeFilterCount = Object.values(activeFilters).filter(value =>
        value !== null && value !== undefined && value !== '' && value !== false
    ).length;

    if (activeFilterCount === 0) return null;

    return (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-2">현재 적용된 필터</h3>
          <div className="space-y-2">
            {activeFilters.startDate && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>시작일: {formatDate(activeFilters.startDate)}</span>
                </div>
            )}
            {activeFilters.endDate && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>종료일: {formatDate(activeFilters.endDate)}</span>
                </div>
            )}
            {activeFilters.deadline && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>마감일: {formatDate(activeFilters.deadline)}</span>
                </div>
            )}
            {activeFilters.flag && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>중요도 필터 적용됨</span>
                </div>
            )}
            {activeFilters.done && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>완료된 항목만 표시</span>
                </div>
            )}
            {activeFilters.keyword && (
                <div className="flex items-center text-sm text-blue-600">
                  <Check className="h-4 w-4 mr-2"/>
                  <span>검색어: "{activeFilters.keyword}"</span>
                </div>
            )}
          </div>
        </div>
    );
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">필터 설정</h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500"/>
            </button>
          </div>

          {/* 현재 적용된 필터 표시 */}
          <ActiveFilters/>

          <div className="space-y-6">
            {/* 체크박스 섹션 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">상태 필터</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      checked={filterOptions.flag}
                      onChange={(e) => onFilterChange('flag', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">중요도</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      checked={filterOptions.done}
                      onChange={(e) => onFilterChange('done', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">완료 상태</span>
                </label>
              </div>
            </div>

            {/* 기간 설정 섹션 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">기간 설정</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400"/>
                  <input
                      type="date"
                      value={filterOptions.startDate}
                      onChange={(e) => onFilterChange('startDate', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="시작일"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400"/>
                  <input
                      type="date"
                      value={filterOptions.endDate}
                      onChange={(e) => onFilterChange('endDate', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="종료일"
                  />
                </div>
              </div>
            </div>

            {/* 마감일 설정 섹션 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">마감일 설정</h3>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400"/>
                <input
                    type="date"
                    value={filterOptions.deadline}
                    onChange={(e) => onFilterChange('deadline', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="마감일"
                />
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex space-x-3">
              <button
                  onClick={() => {
                    onReset();
                    if (isPendingReset) {
                      onCancelReset();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                초기화
              </button>
              <button
                  onClick={onApply}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FilterModal;
