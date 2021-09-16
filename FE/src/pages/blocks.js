import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import AppPagination from "../Components/AppPagination";
import AppTable, { Head, Body, Row } from "../Components/AppTable/Table";
import Loading from "../Components/Loading";
import PageTitle from "../Components/PageTitle";
import useFetch, { API_URL } from "../hooks/useFetch";

const headObj = {
  height: "Height",
  hash: "Hash",
  time: "Time",
  block_index: "Block Index",
};

export function Blocks() {
  // fetching data from server
  const { status, data, error, run } = useFetch(
    `${API_URL}/getBlocks`
  );
  const { search } = useLocation();
  const history = useHistory();
  const pageId = new URLSearchParams(search).get("page"); /// url searchparms to get search value
  const [currentPage, setCurrentPage] = useState(() => (pageId ? pageId : 1));

  if (status === "error") {
    return (
      <Alert variant='danger'>
        <pre>Error : {JSON.stringify(error)}</pre>
      </Alert>
    );
  }
  const { data: result, itemsCount } = data || {};
  const itemsPerPage = result ? result.length : 0;

  const handlePaginationClick = (pageNum) => {
    console.log('pageNum====',pageNum);
    setCurrentPage(pageNum);
    history.push({
      pathname: "/",
      search: `?page=${pageNum}`,
    });
    run(`${API_URL}/getBlocks?page=${pageNum}`); /// call api for page change
  };

  return (
    <>
      <PageTitle title='Blocks' />
      <Loading show={status === "pending"} />
      <AppTable>
        {() => (
          <>
            <Head>
              <Row>
                {Object.keys(headObj).map((item) => (
                  <th key={item}>{headObj[item]}</th>
                ))}
              </Row>
            </Head>
            <Body>
              {result &&
                result.map((item, index) => {
                  return (
                    <Row key={`${item.height}-${index}`}>
                      {Object.keys(headObj).map((key, index) => {
                        if (key === "hash") {
                          return (
                            <td width='220px' key={`${item[key]}-${index}`}>
                              <Link to={`/block/${item.hash}`}>
                                {item[key]}
                              </Link>
                            </td>
                          );
                        }
                        return (
                          <td width='100px' key={`${item[key]}-${index}`}>
                            {item[key]}
                          </td>
                        );
                      })}
                    </Row>
                  );
                })}
            </Body>
          </>
        )}
      </AppTable>
      <AppPagination
        itemsPerPage={itemsPerPage}
        totalItems={itemsCount}
        handlePaginationClick={handlePaginationClick}
        currentPage={parseInt(currentPage)}
      />
    </>
  );
}
