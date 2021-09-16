/** 
 * Created by vikrant sandal - 16-09-2021
*/
import moment from 'moment';
import { useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import AppPagination from "../Components/AppPagination";
import AppTable, { Body, Head, Row } from "../Components/AppTable/Table";
import Loading from "../Components/Loading";
import PageTitle from "../Components/PageTitle";
import useFetch, { API_URL } from "../hooks/useFetch";

const blockObj = {
  size: "SIZE",
  block_index: "Block Index",
  prev_block: "Previous",
};

const transactionObj = {
  tx_index: "Trnsc id.",
  fee: "Fee",
  time: "Time",
  size: "Size",
};

function BlockInner() {
  const routeParams = useParams();

  // fetching data from server
  const {
    status,
    data: result,
    error,
    run,
  } = useFetch(`${API_URL}/getRawBlock/${routeParams.id}`);

  const { search } = useLocation();
  const pageId = new URLSearchParams(search).get("page");
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(() => (pageId ? pageId : 1));

  const { data = {}, itemsCount } = result || {};
  const itemsPerPage = result ? result.length : 0;

  // on pagination click

  const handlePaginationClick = (pageNum) => {
    setCurrentPage(pageNum);
    history.push({
      pathname: `/block/${routeParams.id}`,
      search: `?page=${pageNum}`,
    });
    run(`${API_URL}/getRawBlock/${routeParams.id}?page=${pageNum}`);
  };

  return (
    <>
      <PageTitle title={`Blocks ${data?.height}`} />
      <Loading show={status === "pending"} />
      <AppTable>
        {() => (
          <>
            <Head>
              {Object.keys(blockObj).map((item, index) => {
                return (
                  <Row key={item}>
                    <td width='500'>
                      <strong>{item}</strong>
                    </td>
                    <td>{data[item]}</td>
                  </Row>
                );
              })}
            </Head>
          </>
        )}
      </AppTable>

      <PageTitle title='Blocks Transactions' />

      <AppTable>
        {() => (
          <>
            <Head>
              <Row>
                {Object.keys(transactionObj).map((item) => (
                  <th key={item}>{transactionObj[item]}</th>
                ))}
              </Row>
            </Head>
            <Body>
              {data?.tx?.map((txItem) => {
                return (
                  <Row key={txItem.hash}>
                    {Object.keys(transactionObj).map((item, index) => {
                      return <td key={item}>{
                        (item === 'fee') ? (txItem[item] / 100000000).toFixed(8) :
                        (item === 'time') ? moment(txItem[item]*1000,'x').format('YYYY-MM-DD HH:mm:ss') :  txItem[item]
                      }</td>;
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

export default BlockInner;
