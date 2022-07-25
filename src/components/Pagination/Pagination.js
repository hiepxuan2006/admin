import React, { useEffect, useState } from 'react';
import paginationBtn from 'utils/paginationbtn';

function Pagination(props) {
   const { pagination, onPageChange } = props;
   const { page, limit, totalRows } = pagination;
   const [listPagination, setListPagination] = useState([]);
   const totalPages = Math.ceil(totalRows / limit);
   useEffect(() => {
      setListPagination(paginationBtn(page, totalPages));
   }, [page, pagination]);
   const handleClick = (newpage) => {
      if (onPageChange) onPageChange(newpage);
   };

   return (
      <nav aria-label="...">
         <div class="pagination">
            <button
               style={{ width: '100px' }}
               onClick={() => handleClick(page - 1)}
               disabled={page <= 1}
               class={`page-item border  rounded-left bg-transparent ${
                  page <= 1 ? 'text-muted' : 'text-primary border-primary'
               }`}
            >
               Previous
            </button>
            {listPagination &&
               listPagination.map((item, key) => {
                  return (
                     <button
                        disabled={item === '...'}
                        onClick={() => handleClick(item)}
                        key={key}
                        class={`page-item border-0 bg-transparent ${
                           item === page ? 'active' : ''
                        }`}
                     >
                        <div class="page-link">{item}</div>
                     </button>
                  );
               })}

            <button
               style={{ width: '100px' }}
               disabled={page >= totalPages}
               onClick={() => handleClick(page + 1)}
               class={`page-item  border rounded-right bg-transparent ${
                  page >= totalPages
                     ? 'text-muted'
                     : 'text-primary border-primary'
               }`}
            >
               Next
            </button>
         </div>
      </nav>
   );
}

export default Pagination;
