import React from 'react';

const SearchResultModal = ({results = []}) => {
    return (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-md p-4 max-h-60 overflow-y-auto z-10">
            {results.length > 0 ? (
                results.map((result) => (
                    <div key={result.id} className="p-2 border-b border-gray-200">
                        <p className="text-sm font-medium">{result.content}</p>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-500">검색 결과가 없습니다</p>
            )}
        </div>
    );
};

export default SearchResultModal;