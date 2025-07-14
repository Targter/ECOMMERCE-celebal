import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../Home/HH/Products/Produt";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ itemsPerPage = 12, products = [] }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
    // Scroll to top of product grid on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Responsive grid columns calculation
  const getGridColumns = () => {
    if (products.length === 0) return "grid-cols-1";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className="w-full">
      {/* Products Grid */}
      <div className={`grid ${getGridColumns()} gap-4 md:gap-6 lg:gap-8`}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item._id}
              className="w-full transition-all duration-300 hover:scale-[1.02]"
            >
              <Product
                _id={item._id}
                img={item.images?.[0]?.url}
                productName={item.name}
                price={item.price}
                color={item.color || "Mixed"}
                badge={item.stock <= 10}
                des={item.description}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-500">
              No products found matching your filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 gap-4">
          <p className="text-sm md:text-base text-gray-600 order-2 md:order-1">
            Showing <span className="font-medium">{itemStart}</span> to{" "}
            <span className="font-medium">
              {Math.min(endOffset, products.length)}
            </span>{" "}
            of <span className="font-medium">{products.length}</span> products
          </p>

          <ReactPaginate
            breakLabel="..."
            nextLabel={<FiChevronRight className="w-5 h-5" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel={<FiChevronLeft className="w-5 h-5" />}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-1 md:gap-2 order-1 md:order-2"
            pageLinkClassName={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-md border border-gray-200 text-sm md:text-base 
              hover:bg-gray-100 transition-colors duration-200`}
            activeLinkClassName="bg-black text-white border-black hover:bg-black"
            previousLinkClassName="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-md border border-gray-200 hover:bg-gray-100"
            nextLinkClassName="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-md border border-gray-200 hover:bg-gray-100"
            disabledLinkClassName="opacity-40 cursor-not-allowed hover:bg-transparent"
            breakClassName="text-gray-400 px-1"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
