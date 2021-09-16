import { useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import AppPagination from "../Components/AppPagination";
import AppTable, { Body, Head, Row } from "../Components/AppTable/Table";
import Loading from "../Components/Loading";
import PageTitle from "../Components/PageTitle";
import useFetch, { API_URL } from "../hooks/useFetch";

// const mockData = {
//   status: 200,
//   responseTimeStamp: 1631538624768,
//   message: "SUCCESS",
//   result: {
//     data: {
//       hash: "00000000000000000003d146e586ab3fd29c5b0f88d0f20fa1dcf4bc5b3f6697",
//       ver: 536870916,
//       prev_block:
//         "0000000000000000000eccd5274e5b4e0d6f241b78786ff87bf635c8d34a5b11",
//       mrkl_root:
//         "9404a607f6ad4f544f9c1cea7f8b876ed2c4a19b07c5791abe1465bfb67f92db",
//       time: 1631447380,
//       bits: 386877668,
//       next_block: [
//         "0000000000000000000d60712da3950606da4fab3ebcc72f7b0e3cc960c9560c",
//       ],
//       fee: 6783224,
//       nonce: 2730436503,
//       n_tx: 1552,
//       size: 835763,
//       block_index: 700187,
//       main_chain: true,
//       height: 700187,
//       weight: 2190944,
//       tx: [
//         {
//           hash: "92358f4d3690cb6e434e3eb3756c11fa2290219d2146f03ae0744142963b552d",
//           ver: 1,
//           vin_sz: 1,
//           vout_sz: 4,
//           size: 360,
//           weight: 1332,
//           fee: 0,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 1595011045541934,
//           double_spend: false,
//           time: 1631447380,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967295,
//               witness:
//                 "01200000000000000000000000000000000000000000000000000000000000000000",
//               script:
//                 "031baf0a1a2f5669614254432f4d696e6564206279206b7a6d696e6573742f2cfabe6d6deab370a586d31f5b88459a97268fdf7045294aa146de5a5d80722a7a992584da100000000000000010e2e51d0c253612339cf61d129fa20100",
//               index: 0,
//               prev_out: null,
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 631783224,
//               spending_outpoints: [
//                 {
//                   tx_index: 2763834122401159,
//                   n: 1,
//                 },
//               ],
//               n: 0,
//               tx_index: 1595011045541934,
//               script: "76a914536ffa992491508dca0354e52f32a3a7a679a53a88ac",
//               addr: "18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 0,
//               spending_outpoints: [],
//               n: 1,
//               tx_index: 1595011045541934,
//               script:
//                 "6a2952534b424c4f434b3aa7f443f6032c57bb8a19b454af22270960b380d7def6d8df6d6a4822003826e8",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 0,
//               spending_outpoints: [],
//               n: 2,
//               tx_index: 1595011045541934,
//               script:
//                 "6a24b9e11b6d93f542ee4b4b0ec910212e93a345d8ac331d9d6966e5ff94196de2e75eba607f",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 0,
//               spending_outpoints: [],
//               n: 3,
//               tx_index: 1595011045541934,
//               script:
//                 "6a24aa21a9edc85691588647efbe4d3979c22b09fa8d000c9557e73888810c8d9526d64d70da",
//             },
//           ],
//         },
//         {
//           hash: "3ed20f3335303467412ccca371a79361a9439bb279a8834b39c50d028db20d29",
//           ver: 2,
//           vin_sz: 1,
//           vout_sz: 3,
//           size: 255,
//           weight: 1020,
//           fee: 21008,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 1444441820774840,
//           double_spend: false,
//           time: 1631446835,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967295,
//               witness: "",
//               script:
//                 "473044022075b236918537e73668bffb7c2dc4259022e4f221b4f4e5f4692ae2b690099c2e022077c1a21a24e4ea80617ed393b5c31525e9cb636c9f89688cb02f3e46f8e2ddb5012102004ca9059e825d9c77a64264acb53748c212eabb49ead0e43a68b326bb6debe8",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "76a914da34737840144cf3d3a71833d154d2f25a2ec16b88ac",
//                 spending_outpoints: [
//                   {
//                     tx_index: 1444441820774840,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 7268562276267556,
//                 value: 124039393,
//                 addr: "1Ltm9BZgDRAY5TXuHEs6H3pGugT2QEXvNC",
//                 n: 5,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 3429700,
//               spending_outpoints: [
//                 {
//                   tx_index: 7334486777062934,
//                   n: 395,
//                 },
//               ],
//               n: 0,
//               tx_index: 1444441820774840,
//               script: "a914777dafe10908025651e26c46d74ba8740bbad42387",
//               addr: "3CapuFzgf7suESh3d9rFHkyrXNUC2XzW9v",
//             },
//             {
//               type: 0,
//               spent: true,
//               value: 103787553,
//               spending_outpoints: [
//                 {
//                   tx_index: 657280397431307,
//                   n: 0,
//                 },
//               ],
//               n: 1,
//               tx_index: 1444441820774840,
//               script: "76a9142c34330dbf3444c55f07e0fff212b5d5346cb1bf88ac",
//               addr: "152jGKasngYtoxxoycNw4bPqwoEQeZpZsf",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 16801132,
//               spending_outpoints: [],
//               n: 2,
//               tx_index: 1444441820774840,
//               script: "a9145411d577f865547b0cb76c9bf280fee8a71fe93387",
//               addr: "39MY3mxZY4mYM1Hy8uaDwdoah6GcZJupDg",
//             },
//           ],
//         },
//         {
//           hash: "4b30b843469afd43438b1d7ed0bf9f22db2cb54e592a1aad0e461836a0abf46b",
//           ver: 1,
//           vin_sz: 1,
//           vout_sz: 2,
//           size: 247,
//           weight: 661,
//           fee: 83500,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 3798355059065608,
//           double_spend: false,
//           time: 1631446865,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967293,
//               witness:
//                 "0247304402205757ecc5b08e8652e366624d2c2784e4831ef58fada14e727fc1c6bd14eb8ebe0220459a72c3681b79a76fb3b864cd102aa13021d71f43ea928ebda4c3cba9e38810012103dfc3d058e8b8eaaa74af0f5c4935228a098bb9c127990630fec10c4a0225b635",
//               script: "16001429690fbaccbf685ede82e0ec29e3e7d0d281ee8f",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "a91452c8fd57dd3013665ee17a805600ae07e9567a1887",
//                 spending_outpoints: [
//                   {
//                     tx_index: 3798355059065608,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 4226047776679841,
//                 value: 32955351,
//                 addr: "39Ek7H47ZU4jriTXoj1jpB4gm6KSa8XQcr",
//                 n: 1,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 10272741,
//               spending_outpoints: [
//                 {
//                   tx_index: 1278996584449407,
//                   n: 0,
//                 },
//               ],
//               n: 0,
//               tx_index: 3798355059065608,
//               script: "a91428f30b9706a77decda14c805c06cc008a0f3c60287",
//               addr: "35RY7JGkzyTFNzYXorLBVMog4wRPNbtdj3",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 22599110,
//               spending_outpoints: [],
//               n: 1,
//               tx_index: 3798355059065608,
//               script: "a91469275cd9c4eca9a219b2517d45f562786fcf969b87",
//               addr: "3BH22etoAJrZUhDw2277hAKV4nAkxAhZQP",
//             },
//           ],
//         },
//         {
//           hash: "a44e4baa5d4be36ab0bf77ff85d7841c768eecb594dba5467d834c69a91a762b",
//           ver: 1,
//           vin_sz: 1,
//           vout_sz: 2,
//           size: 226,
//           weight: 904,
//           fee: 113000,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 1529160110254480,
//           double_spend: false,
//           time: 1631446877,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967195,
//               witness: "",
//               script:
//                 "483045022100db2c8608357beeed97d0cab6ce57b64553d91e85a123f1994fbce4b987c2652e02202fc2f5425d52be5ec0cb680795b135d0ebfb2b2f321e2ee761e3cf4c213063a2012103a751318b16bb03d7412c723139cfd30e846211f060a4ee90005afbca148c9654",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "76a914dc8e0d67a731331de1926b048b1579d18b8e142888ac",
//                 spending_outpoints: [
//                   {
//                     tx_index: 1529160110254480,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 3624113808141496,
//                 value: 5868988,
//                 addr: "1M7BqB5zMPEShxXVvw1mJdt2P6M5LxcQBm",
//                 n: 1,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 2173441,
//               spending_outpoints: [
//                 {
//                   tx_index: 3081138552410631,
//                   n: 16,
//                 },
//               ],
//               n: 0,
//               tx_index: 1529160110254480,
//               script: "76a9141db107cb0a786df74e3ab91f5b394b6ffd20d00a88ac",
//               addr: "13hzfrXGQy2SgVEXA8zT1Zsch7ozj1Zhnh",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 3582547,
//               spending_outpoints: [],
//               n: 1,
//               tx_index: 1529160110254480,
//               script: "76a91493a5a961167a0b1847ca67a829380dfd450ae57f88ac",
//               addr: "1ETgna9MYVyE37HigdQWUY612hTCzwP3rw",
//             },
//           ],
//         },
//         {
//           hash: "f19e987e1de73aa550ee154c7a0f3f9800c0d4fab8923de14b1ec786af0f664c",
//           ver: 2,
//           vin_sz: 1,
//           vout_sz: 2,
//           size: 247,
//           weight: 661,
//           fee: 50000,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 2688039473174755,
//           double_spend: false,
//           time: 1631446939,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967295,
//               witness:
//                 "02473044022061696e8e53d86449d2868972b88ff06da7480518d0a92843c6c6f8da2a3f105c02207aeda9bf007162178625231962945609f046e667b120c93f6995d90096ef9e9401210275494c7fbe3e3e023935feb8d95ce3d2eae2c58e93bc9e18f9d0b570bea4a348",
//               script: "1600149454dc76c8dc02b474f528d47419902736c55089",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "a914c2962095cfdf0c1b236b60dc003d50b3dfebf75e87",
//                 spending_outpoints: [
//                   {
//                     tx_index: 2688039473174755,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 6298001328453778,
//                 value: 807824,
//                 addr: "3KRtrnWr7vBJ9upNyHmGLi9xZNZfVjBAix",
//                 n: 43,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 544000,
//               spending_outpoints: [
//                 {
//                   tx_index: 5292555247105430,
//                   n: 321,
//                 },
//               ],
//               n: 0,
//               tx_index: 2688039473174755,
//               script: "a9143b8d7f549c3ac37992aa5288aae6d71c0c75e5f087",
//               addr: "377uJGkcJWSKjhDgC8MENL2jWquqvQeSAm",
//             },
//             {
//               type: 0,
//               spent: false,
//               value: 213824,
//               spending_outpoints: [],
//               n: 1,
//               tx_index: 2688039473174755,
//               script: "a9143638b2602d11f934c04abc6adb1494f69d1f14af87",
//               addr: "36diLGG8U2LqVUEakEi3KqqyozHChiKHfG",
//             },
//           ],
//         },
//         {
//           hash: "656d5e59cf78ad0c4fc33885451329949231ed0d83f49524c77a45609b9ffda3",
//           ver: 2,
//           vin_sz: 1,
//           vout_sz: 2,
//           size: 225,
//           weight: 573,
//           fee: 43200,
//           relayed_by: "0.0.0.0",
//           lock_time: 700186,
//           tx_index: 5769910394030255,
//           double_spend: false,
//           time: 1631446897,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967294,
//               witness:
//                 "02473044022015ff4584acdf63e6b8a095fdd8d672844f8001c3189f725210ed926eb1687c3b02201e4eb068229dccd52bc6cb9df761c7dc2aff4062c5e3ea7bd0f74c6b176e4278012102de0885297a7b9d7150b91b83a2af5621f7cb1a2115345725dd5c1346084013bb",
//               script: "",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "0014117908d134a371d1d88b52bc2cfd02835b10ddfe",
//                 spending_outpoints: [
//                   {
//                     tx_index: 5769910394030255,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 2686998722596896,
//                 value: 88527000,
//                 addr: "bc1qz9us35f55dcarkyt227zelgzsdd3ph07a23usx",
//                 n: 0,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 36207077,
//               spending_outpoints: [
//                 {
//                   tx_index: 6332156309800085,
//                   n: 1,
//                 },
//               ],
//               n: 0,
//               tx_index: 5769910394030255,
//               script: "76a9143ca12a56e9824f8f085c82ca44bc82b9192cbc2c88ac",
//               addr: "16XacUgnWL5NQu76drXyJPi9tsxR8r5ZZR",
//             },
//             {
//               type: 0,
//               spent: true,
//               value: 52276723,
//               spending_outpoints: [
//                 {
//                   tx_index: 7617290647395576,
//                   n: 0,
//                 },
//               ],
//               n: 1,
//               tx_index: 5769910394030255,
//               script: "001418a90247983812398c4f77ccb7d7473c1cb4b3cd",
//               addr: "bc1qrz5sy3uc8qfrnrz0wlxt04688swtfv7dv89m74",
//             },
//           ],
//         },
//         {
//           hash: "9f7816c1f7929ac842233e31cc3a6ca8f3fb59ee886991cc87805c59c49f972f",
//           ver: 1,
//           vin_sz: 1,
//           vout_sz: 2,
//           size: 224,
//           weight: 896,
//           fee: 50000,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 1674504544398224,
//           double_spend: false,
//           time: 1631447136,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967295,
//               witness: "",
//               script:
//                 "483045022100bf82bc1676387af3ee2115590215a170c22be2cdbda27bc6242c43329637dd7302207ec31b10aa9befa997610a1e83de4f483f73282f61d8f43d94eca6f3fb04cf1c012103b3c036c7b89095d00ddf9b23b93c4781d7c486420ea75ce9d6404344e4ddb4fb",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "76a91400e6e9c2ab476c627c157ccaa2a1a526b86fb79788ac",
//                 spending_outpoints: [
//                   {
//                     tx_index: 1674504544398224,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 2596404445616090,
//                 value: 1993665797,
//                 addr: "115md8GZ5S8CmvUj8a8cW58YcKvv2SekYf",
//                 n: 0,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 1992726697,
//               spending_outpoints: [
//                 {
//                   tx_index: 5380798976829957,
//                   n: 0,
//                 },
//               ],
//               n: 0,
//               tx_index: 1674504544398224,
//               script: "76a91400e6e9c2ab476c627c157ccaa2a1a526b86fb79788ac",
//               addr: "115md8GZ5S8CmvUj8a8cW58YcKvv2SekYf",
//             },
//             {
//               type: 0,
//               spent: true,
//               value: 889100,
//               spending_outpoints: [
//                 {
//                   tx_index: 1989457534335103,
//                   n: 54,
//                 },
//               ],
//               n: 1,
//               tx_index: 1674504544398224,
//               script: "a914a645407ed65e0e0cdc4b3e6d90455a69da88ac1487",
//               addr: "3GrB46Ye6bMzRdPfaTk5NTobNwF7rzt5Jg",
//             },
//           ],
//         },
//         {
//           hash: "2fe1693740f22facc372726ebb01b56daa5a0f1ca21f7912774c2d3c69ce5ebf",
//           ver: 2,
//           vin_sz: 2,
//           vout_sz: 3,
//           size: 468,
//           weight: 1872,
//           fee: 100000,
//           relayed_by: "0.0.0.0",
//           lock_time: 0,
//           tx_index: 6733245146695081,
//           double_spend: false,
//           time: 1631446958,
//           block_index: 700187,
//           block_height: 700187,
//           inputs: [
//             {
//               sequence: 4294967295,
//               witness: "",
//               script:
//                 "473044022048e463ab1bdd3b171fdab31ff64eeeb5bbb46eeb94ac6c2dc01e629b4c981b6e02200341a5dc5d9161534dc40d3f3c8a637897b436b5c07de1e1929ed9ee4977076a0141047146f0e0fcb3139947cf0beb870fe251930ca10d4545793d31033e801b5219abf56c11a3cf3406ca590e4c14b0dab749d20862b3adc4709153c280c2a78be10c",
//               index: 0,
//               prev_out: {
//                 spent: true,
//                 script: "76a91443849383122ebb8a28268a89700c9f723663b5b888ac",
//                 spending_outpoints: [
//                   {
//                     tx_index: 6733245146695081,
//                     n: 0,
//                   },
//                 ],
//                 tx_index: 2538875608284428,
//                 value: 6895538,
//                 addr: "17A16QmavnUfCW11DAApiJxp7ARnxN5pGX",
//                 n: 2,
//                 type: 0,
//               },
//             },
//             {
//               sequence: 4294967295,
//               witness: "",
//               script:
//                 "47304402201a8339c815cdb32481db5e69c1fa6b1310cf1a08b164253063045f6a57a638d502204612bdbf913e94db90c5bcb5586eb43ddd4b11d0f2318f6b1430301fbe6426440141047146f0e0fcb3139947cf0beb870fe251930ca10d4545793d31033e801b5219abf56c11a3cf3406ca590e4c14b0dab749d20862b3adc4709153c280c2a78be10c",
//               index: 1,
//               prev_out: {
//                 spent: true,
//                 script: "76a91443849383122ebb8a28268a89700c9f723663b5b888ac",
//                 spending_outpoints: [
//                   {
//                     tx_index: 6733245146695081,
//                     n: 1,
//                   },
//                 ],
//                 tx_index: 7070833921916954,
//                 value: 141597125,
//                 addr: "17A16QmavnUfCW11DAApiJxp7ARnxN5pGX",
//                 n: 2,
//                 type: 0,
//               },
//             },
//           ],
//           out: [
//             {
//               type: 0,
//               spent: true,
//               value: 4889690,
//               spending_outpoints: [
//                 {
//                   tx_index: 3954612251484427,
//                   n: 142,
//                 },
//               ],
//               n: 0,
//               tx_index: 6733245146695081,
//               script: "a914c8acf45f3832fac08e598201e49211b223b7e87687",
//               addr: "3Kz6G1DgXmUuBqa82FJjPbCxXVpVJ57KSf",
//             },
//             {
//               type: 0,
//               spent: true,
//               value: 37906803,
//               spending_outpoints: [
//                 {
//                   tx_index: 5554587151176672,
//                   n: 0,
//                 },
//               ],
//               n: 1,
//               tx_index: 6733245146695081,
//               script: "76a9149bfb382fa259b43ba6e39f158f34096aca9b8d8f88ac",
//               addr: "1FDkgmbpuCfkCohe8LdHxJB5dXHbcCRsrt",
//             },
//             {
//               type: 0,
//               spent: true,
//               value: 105596170,
//               spending_outpoints: [
//                 {
//                   tx_index: 7393320270230977,
//                   n: 0,
//                 },
//               ],
//               n: 2,
//               tx_index: 6733245146695081,
//               script: "76a91443849383122ebb8a28268a89700c9f723663b5b888ac",
//               addr: "17A16QmavnUfCW11DAApiJxp7ARnxN5pGX",
//             },
//           ],
//         },
//       ],
//     },
//     itemsCount: 1552,
//   },
// };

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
  console.log('result=====', result);
  console.log('data=====', data);
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
                      return <td key={item}>{txItem[item]}</td>;
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
