exports.mockUUID = "59b18399-5b4c-4e68-8ff4-bac4aea93bc1";
exports.mockValueGetBlocks = {
    absentInRedis: null,
    getBlockDatapresentInRedis: "[{\"hash\":\"0000000000000000000c61959dd2676e8cb21eee5a00b3b81a2a764d7bfd1de8\",\"height\":700339,\"time\":1631532719,\"block_index\":700339},{\"hash\":\"0000000000000000000659caaaa68602d6a2d5814e6bf4f4414e230382c9d1d6\",\"height\":700338,\"time\":1631532616,\"block_index\":700338},{\"hash\":\"0000000000000000000b52a0f75f44d6ea2c5f6c8b7241d518e42aaeb7a955d4\",\"height\":700337,\"time\":1631531598,\"block_index\":700337},{\"hash\":\"0000000000000000000f2be0611771754b75aebc3dfd39b3b44535d16904bc74\",\"height\":700336,\"time\":1631531469,\"block_index\":700336},{\"hash\":\"00000000000000000000f12ced57ea2e496dc3026138f23f0b7433e86baf927f\",\"height\":700335,\"time\":1631531322,\"block_index\":700335},{\"hash\":\"00000000000000000007f463033f9fb91137068bd2c2c21765de727ecf3f9885\",\"height\":700334,\"time\":1631530775,\"block_index\":700334},{\"hash\":\"0000000000000000000114b1ea71bb2c6fce0a129a6290494de1e2b16e9a5137\",\"height\":700333,\"time\":1631525004,\"block_index\":700333},{\"hash\":\"000000000000000000047c374fce2be21cff8924a96de5f8075505aac8752957\",\"height\":700332,\"time\":1631524861,\"block_index\":700332}]",
    getBlocksDataInsertInRedis: [
        {
            "hash": "0000000000000000000c61959dd2676e8cb21eee5a00b3b81a2a764d7bfd1de8",
            "height": 700339,
            "time": 1631532719,
            "block_index": 700339
        },
        {
            "hash": "0000000000000000000659caaaa68602d6a2d5814e6bf4f4414e230382c9d1d6",
            "height": 700338,
            "time": 1631532616,
            "block_index": 700338
        },
        {
            "hash": "0000000000000000000b52a0f75f44d6ea2c5f6c8b7241d518e42aaeb7a955d4",
            "height": 700337,
            "time": 1631531598,
            "block_index": 700337
        },
        {
            "hash": "0000000000000000000f2be0611771754b75aebc3dfd39b3b44535d16904bc74",
            "height": 700336,
            "time": 1631531469,
            "block_index": 700336
        }
    ],
    getRawBlockDataPresentInRedis: "{\"hash\":\"0000000000000000000c61959dd2676e8cb21eee5a00b3b81a2a764d7bfd1de8\",\"prev_block\":\"0000000000000000000659caaaa68602d6a2d5814e6bf4f4414e230382c9d1d6\",\"time\":1631532719,\"fee\":7478379,\"size\":1316559,\"block_index\":700339,\"main_chain\":true,\"height\":700339,\"weight\":3992973,\"tx\":[{\"hash\":\"4e30a94680619b17ff87ab78bfbc458960166064128cf6a62c4c35ed5f081907\",\"ver\":2,\"vin_sz\":1,\"vout_sz\":2,\"size\":225,\"weight\":573,\"fee\":43258,\"relayed_by\":\"0.0.0.0\",\"lock_time\":700338,\"tx_index\":249731074598569,\"double_spend\":false,\"time\":1631532711,\"block_index\":700339,\"block_height\":700339}]}",
    getRawBlockDataInsertInRedis: {
        "hash": "0000000000000000000c61959dd2676e8cb21eee5a00b3b81a2a764d7bfd1de8",
        "prev_block": "0000000000000000000659caaaa68602d6a2d5814e6bf4f4414e230382c9d1d6",
        "time": 1631532719,
        "fee": 7478379,
        "size": 1316559,
        "block_index": 700339,
        "main_chain": true,
        "height": 700339,
        "weight": 3992973,
        "tx": [
            {
                "hash": "4e30a94680619b17ff87ab78bfbc458960166064128cf6a62c4c35ed5f081907",
                "ver": 2,
                "vin_sz": 1,
                "vout_sz": 2,
                "size": 225,
                "weight": 573,
                "fee": 43258,
                "relayed_by": "0.0.0.0",
                "lock_time": 700338,
                "tx_index": 249731074598569,
                "double_spend": false,
                "time": 1631532711,
                "block_index": 700339,
                "block_height": 700339,
            }
        ]
    }
}
exports.mockRedisValueSbid = 'c57fbebb-b24c-491f-a9db-93497de833bd:ed42a65e-6d8c-477e-af75-7588c0c222cc:9f6d23cc-645a-4fef-9c48-8b530901ebb8:Dev'
