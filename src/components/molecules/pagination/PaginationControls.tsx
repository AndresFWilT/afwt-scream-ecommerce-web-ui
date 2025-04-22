interface PaginationControlsProps {
    currentPage: number;
    itemsPerPage: number;
    hasMore: boolean;
    onPageChange: (newPage: number) => void;
    onItemsPerPageChange: (newLimit: number) => void;
}

const PaginationControls = ({
                                currentPage,
                                itemsPerPage,
                                hasMore,
                                onPageChange,
                                onItemsPerPageChange
                            }: PaginationControlsProps) => {
    return (
        <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between afwt-ecommerce-items-center afwt-ecommerce-mt-10 afwt-ecommerce-gap-4 afwt-ecommerce-flex-col sm:afwt-ecommerce-flex-row">
            <div className="afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-gap-2">
                <label htmlFor="itemsPerPage" className="afwt-ecommerce-text-sm afwt-ecommerce-font-medium">
                    Items per page:
                </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="afwt-ecommerce-border afwt-ecommerce-rounded-md afwt-ecommerce-py-1 afwt-ecommerce-px-2 afwt-ecommerce-text-sm"
                >
                    {[5, 10, 20, 50].map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="afwt-ecommerce-flex afwt-ecommerce-gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="afwt-ecommerce-px-3 afwt-ecommerce-py-1 afwt-ecommerce-border afwt-ecommerce-rounded-md afwt-ecommerce-text-sm afwt-ecommerce-bg-white afwt-ecommerce-disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="afwt-ecommerce-text-sm afwt-ecommerce-font-medium">
                    Page {currentPage}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasMore}
                    className="afwt-ecommerce-px-3 afwt-ecommerce-py-1 afwt-ecommerce-border afwt-ecommerce-rounded-md afwt-ecommerce-text-sm afwt-ecommerce-bg-white afwt-ecommerce-disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
