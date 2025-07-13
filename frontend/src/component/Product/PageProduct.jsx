
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../Home/HH/Products/Produt";

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
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.map((item) => (
          <div key={item._id} className="w-full">
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
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center mt-8">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
          breakLabel="..."
        />
        <p className="text-base font-normal text-lightText mb-4 mdl:mb-0">
          Showing {itemStart} to {Math.min(endOffset, products.length)} of{" "}
          {products.length} products
        </p>
      </div>
    </div>
  );
};

export default Pagination;
