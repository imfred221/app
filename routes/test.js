module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    var request = require('sync-request');
    var requestPromise = require('request-promise');
    var moment = require('moment-timezone');

    // [JIRA 정보]
    // var jira_userid = 'apiuser';
    // var jira_userpasswd = 'api_jira';
    var jira_userid = 'hskwon';
    var jira_userpasswd = 'cafe24@01';
    var jira_url = "https://" + jira_userid + ":" + jira_userpasswd + "@jira.simplexi.com"

    router.post('/', (req, res) => {
        //[변수 목록]
        var period = req.body.period;
        var year = period.split('/')[0];
        var month = period.split('/')[1];
        var jira_api_uri = jira_url + '/rest/api/2/issue'
        var filter_api_uri = jira_url + '/rest/api/2/filter'
        var jira_output = {}
        var filter_output = {};

        //[파라미터 정합성]
        var regexp = /^[0-9]{4}\/[0-9]{2}$/g;
        if (req.body.period == undefined) return res.status(422).send({ error: { code: 422, message: 'period는 필수 입력항목 입니다.' } });
        if (!regexp.test(req.body.period)) return res.status(422).send({ error: { code: 422, message: req.body.period + '는 정확한 형식이 아님니다.(예:2020/01))' } })

        //[jira생성 데이터 리스트]
        var jira_data_list = {
            "통합테스트_배포건": [
                // {
                //     "key": "통테 배포건",
                //     "project": "리뷰톡톡",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "플러스앱",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "마켓연동",
                //     "assignee": "skhur",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "STAFF",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 배포건",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // }
            ],
            "통합테스트_기본기능": [
            //     {
            //         "key": "통테 기본기능",
            //         "project": "EC",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "리뷰톡톡",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "플러스앱",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "마켓연동",
            //         "assignee": "skhur",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "스마트재고",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "STAFF",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "레시피",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "에디봇",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "앱 스토어",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "이지어드민",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "네이버페이",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "호스팅",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 기본기능",
            //         "project": "이지픽",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     }
            // ],
            // "통합테스트_자동화_신규구현": [
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "EC",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "리뷰톡톡",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "플러스앱",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "마켓연동",
            //         "assignee": "skhur",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "스마트재고",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "STAFF",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "레시피",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "에디봇",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "앱 스토어",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "이지어드민",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "네이버페이",
            //         "assignee": "mrlee03",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "호스팅",
            //         "assignee": "mschoi",
            //         "reporter": "mhchoi"
            //     },
            //     {
            //         "key": "통테 자동화 신규구현",
            //         "project": "이지픽",
            //         "assignee": "shkim14",
            //         "reporter": "mhchoi"
            //     }
            ],
            "통합테스트_자동화_유지보수": [
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "EC",
                //     "assignee": "kclee",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "리뷰톡톡",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "플러스앱",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "마켓연동",
                //     "assignee": "skhur",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "STAFF",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // }
            ],
            "통합테스트_TC관리": [
                // {
                //     "key": "통테 TC관리",
                //     "project": "리뷰톡톡",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "마켓연동",
                //     "assignee": "skhur",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "STAFF",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 TC관리",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // }
            ],
            "배포관리": [
                // {
                //     "key": "배포관리",
                //     "project": "EC",
                //     "assignee": "ywshin",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "리뷰톡톡",
                //     "assignee": "ohhong",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "플러스앱",
                //     "assignee": "ohhong",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "마켓연동",
                //     "assignee": "hysong",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "STAFF",
                //     "assignee": "mhpark",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포관리",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // }
            ],
            "단위QA테스트지원": [
                // {
                //     "key": "단테 지원",
                //     "project": "EC",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "리뷰톡톡",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "플러스앱",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "마켓연동",
                //     "assignee": "skhur",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "STAFF",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 지원",
                //     "project": "커스텀",
                //     "assignee": "mhchoi",
                //     "reporter": "mhchoi"
                // }
            ],
            "단위QA": [
                // {
                //     "key": "단위 QA",
                //     "project": "EC",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "리뷰톡톡",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "플러스앱",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "마켓연동",
                //     "assignee": "skhur",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "스마트재고",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "STAFF",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "레시피",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "에디봇",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "앱 스토어",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "이지어드민",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "네이버페이",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "호스팅",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "이지픽",
                //     "assignee": "shkim14",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단위 QA",
                //     "project": "커스텀",
                //     "assignee": "mhchoi",
                //     "reporter": "mhchoi"
                // }
            ],
            "통합테스트_정합성_TC관리": [
                // {
                //     "key": "통테 정합성 점검/TC관리",
                //     "project": "EC",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // }
            ],
            "고도화_TC관리": [
                // {
                //     "key": "고도화 TC관리",
                //     "project": "EC",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // }
            ],
            "API_TC_자동화_제작": [
                // {
                //     "key": "API TC 자동화 제작",
                //     "project": "",
                //     "assignee": "mschoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "서버 변경점 관리(모니터링)",
                //     "project": "EC",
                //     "assignee": "mrlee03",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "배포대응 업무",
                //     "project": "",
                //     "assignee": "mhchoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "단테 사전요해",
                //     "project": "",
                //     "assignee": "mhchoi",
                //     "reporter": "mhchoi"
                // },
                // {
                //     "key": "통테 건별 커버리지 분석",
                //     "project": "",
                //     "assignee": "mhchoi",
                //     "reporter": "mhchoi"
                // }
            ]
        }

        //[filter생성 테이터 리스트]
        var filter_data_list = {
            "전체_업무": [
                // {
                //     "key": "전체",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND type not in subTaskIssueTypes()`
                // }
            ],
            "통테관련_업무": [
                // {
                //     "key": "통테 배포건",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 배포건" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 기본기능",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 기본기능" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 자동화 신규구현",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 자동화 신규구현" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 자동화 유지보수",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 자동화 유지보수" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 TC관리",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 TC관리" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee, hrjeon03) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "배포관리",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "배포관리" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee, ywshin, cskim03, ohhong, mhpark, hysong) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 정합성 점검/TC관리",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 정합성" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "통테 건별 커버리지 분석",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "통테 건별 커버리지 분석" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "배포대응",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "배포대응" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // }
            ],
            "단테관련_업무": [
                // {
                //     "key": "단테 지원",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "단테 지원" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "단위 QA",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "단위" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "고도화 TC관리",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "고도화 TC관리" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // },
                // {
                //     "key": "단테 사전요해",
                //     "jql": `labels = 지사QA업무지라 AND labels = ${year}.${month} AND summary ~ "단테 사전요해" AND assignee in (mhchoi, mschoi, skhur, mrlee03, shkim14, kclee) AND type not in subTaskIssueTypes()`
                // }
            ]
        }

        //[jira생성 콘솔 타이틀]
        console.log("========================================")
        console.log(`[${period} 업무별 메인지라]`)
        console.log("========================================")

        //[jira생성 함수 실행]   
        for(var jira in jira_data_list){
            jira_output[jira]={};
            jiraList(jira);
        }

        //[filter생성 콘솔 타이틀]
        console.log("========================================")
        console.log(`${year}년 ${month}월 유형별 업무지라 필터`)
        console.log("========================================")

        //[filter생성 함수 실행]  
        for(var filter in filter_data_list){
            filter_output[filter]={};
            filterList(filter);
        }

        //응답값 생성
        res.status(201).json({ jira: jira_output, filter: filter_output })

        //[jira생성 함수]
        function jiraList(category) {
            console.log(category)
            for (jira in jira_data_list[category]) {
                var summary;
                if (jira_data_list[category][jira].project == "") {
                    summary = `${jira_data_list[category][jira].key}`
                } else {
                    summary = `[${jira_data_list[category][jira].project}] ${jira_data_list[category][jira].key}`
                }
                var create_jira_body = {
                    json: {
                        "fields": {
                            "summary": `${summary}_${period}`,
                            "issuetype": {
                                "id": "87"
                            },
                            "project": {
                                "id": "17600"
                            },
                            "reporter": {
                                "name": jira_data_list[category][jira].reporter
                            },
                            "priority": {
                                "id": "3"
                            },
                            "labels": [
                                "지사QA업무지라",
                                `${year}.${month}`
                            ],
                            "security": {
                                "id": "11828"
                            },
                            "assignee": {
                                "name": jira_data_list[category][jira].assignee
                            }
                        }
                    }
                }

                var create_jira_response = request('POST', jira_api_uri, create_jira_body)
                var create_jira_result = JSON.parse(create_jira_response.getBody('utf8'));
                var jira_key = create_jira_result.key;

                console.log(`-${summary}:https://jira.simplexi.com/browse/${jira_key}`)
                jira_output[category][`${summary}`] = `https://jira.simplexi.com/browse/${jira_key}`
            }
        }

        //[filter생성 함수]
        function filterList(category) {
            console.log(`--------------${category}------------------  `)
            for (filter in filter_data_list[category]) {
                var create_filter_body = {
                    json: {
                        name: `#${year}년 ${month}월 ${filter_data_list[category][filter].key} 업무지라`,
                        description: "",
                        jql: filter_data_list[category][filter].jql,
                        favourite: false
                    }
                }
                var permission_body = {
                    json: {
                        type: "global"
                    }
                }

                var create_filter_response = request('POST', filter_api_uri, create_filter_body)
                var create_filter_result = JSON.parse(create_filter_response.getBody('utf8'));
                var permission_filter_response = request('POST', filter_api_uri + '/' + create_filter_result.id + '/permission', permission_body)

                console.log(`#${year}년 ${month}월 ${filter_data_list[category][filter].key} 업무지라: https://jira.simplexi.com/issues/?filter=${create_filter_result.id}`)
                filter_output[category][`#${year}년 ${month}월 ${filter_data_list[category][filter].key} 업무지라`] = `https://jira.simplexi.com/issues/?filter=${create_filter_result.id}`
            }
        }
    });

    return router;
}