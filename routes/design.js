module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var AdmZip = require('adm-zip');
    var targz = require('targz');

    router.post('/', (req, res) => {
        var file_list = []
        var skin_data_list = {
            "PC_KR": {
                "origin_skin": "base",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_US": {
                "origin_skin": "base_skin1_en_US",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_JP": {
                "origin_skin": "base_skin2_ja_JP",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_CN": {
                "origin_skin": "base_skin3_zh_CN",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_TW": {
                "origin_skin": "base_skin4_zh_TW",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_PT": {
                "origin_skin": "base_skin5_pt_PT",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_ES": {
                "origin_skin": "base_skin6_es_ES",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_VN": {
                "origin_skin": "base_skin7_vi_VN",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_PH": {
                "origin_skin": "base_skin8_en_PH",
                "replace_skin": "",
                "file_name": "",
            },
            "PC_KR_GB": {
                "origin_skin": "base_skin0_ko_GB",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_KR": {
                "origin_skin": "mobile",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_US": {
                "origin_skin": "mobile_skin1_en_US",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_JP": {
                "origin_skin": "mobile_skin2_ja_JP",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_CN": {
                "origin_skin": "mobile_skin3_zh_CN",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_TW": {
                "origin_skin": "mobile_skin4_zh_TW",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_PT": {
                "origin_skin": "mobile_skin5_pt_PT",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_ES": {
                "origin_skin": "mobile_skin6_es_ES",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_VN": {
                "origin_skin": "mobile_skin7_vi_VN",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_PH": {
                "origin_skin": "mobile_skin8_en_PH",
                "replace_skin": "",
                "file_name": "",
            },
            "mobile_KR_GB": {
                "origin_skin": "mobile_skin0_ko_GB",
                "replace_skin": "",
                "file_name": "",
            },
        }

        //[파라미터 정합성]
        for (var shop in req.body) {
            var regexp = /tar.gz/g;
            if (req.body[shop] == "") {
                return res.status(422).send(
                    {
                        error:
                        {
                            code: 422,
                            message: shop + '는 빈값 입력 불가 합니다'
                        }
                    }
                )
            } else if (!regexp.test(req.body[shop])) {
                return res.status(422).send(
                    {
                        error:
                        {
                            code: 422,
                            message: shop + '는 정확한 압축파일이 아님니다.(tar.gz)'
                        }
                    }
                )
            } else {
                skin_data_list[shop]["file_name"] = req.body[shop];
                skin_data_list[shop]["replace_skin"] = req.body[shop].split('_a_')[1].split('_H')[0];
                file_list.push(shop);
            }
            // console.log(`${shop}:${req.body[shop]}`)
        }

        fs.readdir('./design', function (err, file) {
            for (var index in file) {
                if (file[index].indexOf("zip") !== -1) {
                    console.log(file[index])

                    // reading archives
                    var zip = new AdmZip(`design/${file[index]}`);

                    // zip.extractAllTo("./design", true);
                    zip.extractEntryTo(`base/`, "./design", true, true);
                    fs.rename(`./design/base/`, `./design/skin24/`, function (err) {
                        if (err) {
                            console.log(`폴더명 변경 실패 하였습니다`)
                        } else {
                            console.log(`폴더명 변경 성공 하였습니다`)
                        }
                    })
                    targz.compress({
                        src: './design/skin24',
                        dest: './'
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Done!");
                        }
                    });
                }
            }
        })
       


        //응답값 생성
        res.status(201).json({ design: "ok" })

    });

    return router;
}