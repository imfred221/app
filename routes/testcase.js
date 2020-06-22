module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    var request = require('sync-request');
    var requestPromise = require('request-promise');
    var moment = require('moment-timezone');
    var xlsx = require('xlsx');


    router.post('/', (req, res) => {
        //[변수 목록]
        // var period = req.body.period;
        // var year = period.split('/')[0];
        // var month = period.split('/')[1];
        // var jira_api_uri = jira_url + '/rest/api/2/issue'
        // var filter_api_uri = jira_url + '/rest/api/2/filter'
        // var jira_output = {}
        // var filter_output = {};

        // //[파라미터 정합성]
        // var regexp = /^[0-9]{4}\/[0-9]{2}$/g;
        // if (req.body.period == undefined) return res.status(422).send({ error: { code: 422, message: 'period는 필수 입력항목 입니다.' } });
        // if (!regexp.test(req.body.period)) return res.status(422).send({ error: { code: 422, message: req.body.period + '는 정확한 형식이 아님니다.(예:2020/01))' } })

        var ws = xlsx.utils.json_to_sheet(
            [
                {"entity_group":"John", "tc_code": "Seattle"},
                {"entity_group":"Mike", "step": "Los Angeles"},
                {"entity_group":"Zach", "json": "New York"}
            ],
            {
                header:
                    [
                        "entity_group",
                        "entity_id",
                        "tc_code",
                        "tc_name",
                        "step",
                        "expect_result",
                        "http_method",
                        "url",
                        "json",
                        "expect_status_code",
                        "auto",
                        "variable",
                        "value",
                        "url_replace_origin",
                        "url_replace_change",
                        "chkList",
                        "headers",
                        "replace_json"
                    ]
            }
        );

        var wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        var filename = "test" + moment().tz('Asia/Seoul').format('YYYYMMDDhhmmss') + ".xlsx";
        xlsx.writeFile(wb, filename)

        console.log(req.files)
        //응답값 생성
        res.status(201).json({ jira: "1" })

    });

    return router;
}
