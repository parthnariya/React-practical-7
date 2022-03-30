import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user-slice";
import PageNavigationStyle from "../../styled/PageNavigation.style";
function PageNavigation(props) {
  const dispatch = useDispatch()
  const {currentPage,totalPage,perPage} = useSelector(state => state.user)
  const curr = currentPage;

  const prev = curr !== 1 ? curr - 1 : -1;
  const next = curr < totalPage ? curr + 1 : -1;
  
  const fetchNextPage = () => {
    dispatch(getUser({page:next,perPage}))
  }
  const fetchPreviousPage = () => {
    dispatch(getUser({page:prev,perPage}))
  }

  const fetchPage = (event) => {
    event.preventDefault()
    dispatch(getUser({page : 1,perPage : event.target.value}))
  }
  
  
  return (
    <PageNavigationStyle>
      <select onClick={fetchPage}>
        <option value={2}>2 Per Page</option>
        <option value={4}>4 Per Page</option>
        <option value={6}>6 Per Page</option>
      </select>
      {prev !== -1 && <div className="Button" onClick={fetchPreviousPage} >{curr-1}</div>}
      <div className="Button" style={{backgroundColor : "orange"}} >{curr}</div>
      {next !== -1 && <div className="Button" onClick={fetchNextPage} >{curr+1}</div>}
    </PageNavigationStyle>
  );
}

export default PageNavigation;
