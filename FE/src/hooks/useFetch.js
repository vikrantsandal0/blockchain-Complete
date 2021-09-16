import { useReducer, useEffect, useRef, useState } from "react";

export const API_URL = 'http://localhost:5000/api/v1'

const mockData = {
  status: 200,
  responseTimeStamp: 1631538053138,
  message: "SUCCESS",
  result: {
    data: [
      {
        hash: "0000000000000000000b326766aff025f3f8221c27d09522dc2426fa9a504e46",
        height: 700183,
        time: 1631445296,
        block_index: 700183,
      },
      {
        hash: "00000000000000000007a6dcdd06d27891e3dbb8becbd1394cf7a864eef48d0a",
        height: 700182,
        time: 1631444917,
        block_index: 700182,
      },
      {
        hash: "0000000000000000000bb6b708172d7c041cf1f266b48e4748c359154ea90eba",
        height: 700181,
        time: 1631444875,
        block_index: 700181,
      },
      {
        hash: "00000000000000000001f2932b400d2d158f4b3c334f7da198ee34cbced26324",
        height: 700180,
        time: 1631444858,
        block_index: 700180,
      },
      {
        hash: "0000000000000000000e5ce76ccff557464169a011cc36d89c647ee7d840ac40",
        height: 700179,
        time: 1631443905,
        block_index: 700179,
      },
      {
        hash: "0000000000000000000e0d9fe24b71edc207907c4e093a7bc00dfa00be27425a",
        height: 700178,
        time: 1631443705,
        block_index: 700178,
      },
      {
        hash: "00000000000000000007d143061e8ae9410cf62bcb4209ab7123e747ba6e7030",
        height: 700177,
        time: 1631441355,
        block_index: 700177,
      },
      {
        hash: "0000000000000000000b2c4cc79569b09f8fe62a35d3c123b6aa6ba3f2694cf9",
        height: 700176,
        time: 1631441102,
        block_index: 700176,
      },
    ],
    itemsCount: 147,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, status: "pending", error: null };
    case "resolved":
      return { status: "resolved", data: action.data, error: null };
    case "error":
      return { status: "error", data: null, error: action.error };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function useFetch(
  url,
  options,
  headers = {
    "content-type": "application/json;charset=UTF-8",
  }
) {
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    data: {}
  });
  const { status, data, error } = state;
  const cancelRequest = useRef(false);

  //  update url when the url params change
  const [pageUrl, setPageUrl] = useState(url)



  const fetchData = async () => {
    dispatch({ type: "pending" });

    try {
      const response = await fetch(pageUrl, { ...options, headers });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      //if (cancelRequest.current) return;
      dispatch({ type: "resolved", data: data.result });
    } catch (error) {
      if (cancelRequest.current) return;
      dispatch({ type: "error", error: error.message });
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [pageUrl]);

  const run = (runUrl) => {
    setPageUrl(runUrl)
  };

  return {
    status,
    data,
    error,
    run
  };
}

export default useFetch;
