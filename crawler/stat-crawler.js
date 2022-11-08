const _ = require("lodash");
const axios = require("axios");
const cheerio = require("cheerio");

class StatCrawler {
  constructor() {
    this.client = axios.create({
      headers: {
        // 실제 크롬 웹브라우저에서 보내는 값과 동일하게 넣기
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      },
    });
  }

  async crawlStat() {
    // 공식 사이트 '발생동향 > 국내 발생 현황' 페이지의 주소
    const url =
      "https://ncov.kdca.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=";
    const resp = await this.client.get(url);
    const $ = cheerio.load(resp.data);

    return {
      basicStats: this._extractBasicStats($),
      basicStats1: this._extractBasicStats2($),
      basicStats2: this._extractBasicStats3($),
      basicStats3: this._extractBasicStats4($),
      //basicStats4: this._extractBasicStats5($),
    };
  }

  _extractBasicStats($) {
    let result = null;
    const titles = $("h5.s_title_in3");
    titles.each((i, el) => {
      const titleTextEl = $(el)
        .contents()
        .toArray()
        .filter((x) => x.type === "text");

      // 제목이 '확진 현황' 다음에 나오는 테이블을 찾는다
      if ($(titleTextEl).text().trim() === "확진 현황") {
        const tableEl = $(el).next();
        if (!tableEl) {
          throw new Error("table not found.");
        }
        // 테이블 내의 셀을 모두 찾아서 가져온다
        const cellEls = tableEl.find("tbody tr td");

        // 찾아진 셀에 있는 텍스트를 읽어서 숫자로 변환한다.
        const values = cellEls
          .toArray()
          .map((node) => this._normalize($(node).text()));

        result = {
          confirmed: values[6],
          prev_confirmed: values[5],
          prev_confirmed1: values[4],
          prev_confirmed2: values[3],
          prev_confirmed3: values[2],
          prev_confirmed4: values[1],
          prev_confirmed5: values[0],
        };
      }
    });

    if (result == null) {
      throw new Error("Data not found");
    }

    return result;
  }

  _extractBasicStats2($) {
    let result = null;
    const titles = $("h5.s_title_in3");
    titles.each((i, el) => {
      const titleTextEl = $(el)
        .contents()
        .toArray()
        .filter((x) => x.type === "text");

      // 제목이 '신규입원' 다음에 나오는 테이블을 찾는다
      if ($(titleTextEl).text().trim() === "신규입원 현황") {
        const tableEl = $(el).next();
        if (!tableEl) {
          throw new Error("table not found.");
        }

        const cellEls = tableEl.find("tbody tr td");

        const values = cellEls
          .toArray()
          .map((node) => this._normalize($(node).text()));

        result = {
          hospital: values[6],
          prev_hospital: values[5],
        };
      }
    });

    if (result == null) {
      throw new Error("Data not found");
    }

    return result;
  }

  _extractBasicStats3($) {
    let result = null;
    const titles = $("h5.s_title_in3");
    titles.each((i, el) => {
      const titleTextEl = $(el)
        .contents()
        .toArray()
        .filter((x) => x.type === "text");

      // 제목이 '재원 위중증' 다음에 나오는 테이블을 찾는다
      if ($(titleTextEl).text().trim() === "재원 위중증 현황") {
        const tableEl = $(el).next();
        if (!tableEl) {
          throw new Error("table not found.");
        }

        const cellEls = tableEl.find("tbody tr td");

        const values = cellEls
          .toArray()
          .map((node) => this._normalize($(node).text()));

        result = {
          critical: values[6],
          prev_critical: values[5],
        };
      }
    });

    if (result == null) {
      throw new Error("Data not found");
    }

    return result;
  }

  _extractBasicStats4($) {
    let result = null;
    const titles = $("h5.s_title_in3");
    titles.each((i, el) => {
      const titleTextEl = $(el)
        .contents()
        .toArray()
        .filter((x) => x.type === "text");

      
      if ($(titleTextEl).text().trim() === "사망 현황") {
        const tableEl = $(el).next();
        if (!tableEl) {
          throw new Error("table not found.");
        }

        const cellEls = tableEl.find("tbody tr td");

        const values = cellEls
          .toArray()
          .map((node) => this._normalize($(node).text()));

        result = {
          death: values[6],
          prev_death: values[5],
        };
      }
    });

    if (result == null) {
      throw new Error("Data not found");
    }

    return result;
  }

  /*_extractBasicStats5($) {
    const mapping = {
      남성 : 'male',
      여성 : 'female',
    };

    return this._extractDataWithMapping(mapping, $);
  }

  _extractDataWithMapping(mapping, $) {
    const result = {};

    $('.data_table table').each((i, el) => {
      $(el)
        .find('tbody tr')
        .each((j, row) => {
          const cols = $(row).children();
          _.forEach(mapping, (fieldName, firstColumnText) => {
            if ($(cols.get(0)).text() === firstColumnText) {
              result[fieldName] = {
                total_tested1: this._normalize($(cols.get(1)).text()),
                total_decath1 : this._normalize($(cols.get(2)).text()),
              };
            }
          });
        });
    });

    if (_.isEmpty(result)) {
      throw new Error('data not found');
    }

    return result;
  }*/

  _normalize(numberText) {
    const matches = /[0-9,]+/.exec(numberText);
    const absValue = matches[0];
    return parseInt(absValue.replace(/[\s,]*/g, ""));
  }
}

module.exports = StatCrawler;
