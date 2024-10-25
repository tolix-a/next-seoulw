import axios from "axios";
import React from "react";

var convert = require("xml-js");

export function xmlTOjson(axiosResult) {
  const jsonGenre = convert.xml2json(axiosResult, { compact: true, spaces: 4 });
  let dataGenre = JSON.parse(jsonGenre).dbs.db;
  return dataGenre;
}

export const fn = {
  main: async () => {
    let res = await axios.get(`/api/api?type=apiMain`);
    return res.data;
  },

  genre: async (shcate, cpage) => {
    let res = await axios.get(
      `/api/api?type=apiGenre&shcate=${shcate}&cpage=${cpage}`
    );
    console.log(shcate, cpage);
    return res.data;
  },

  thisWeek: async (shcate, cpage) => {
    let res = await axios.get(
      `/api/api?type=apiThisWeek&shcate=${shcate}&cpage=${cpage}`
    );
    return res.data;
  },

  ing: async (shcate, cpage) => {
    let res = await axios.get(
      `/api/api?type=apiIng&shcate=${shcate}&cpage=${cpage}`
    );
    return res.data;
  },

  upcoming: async (shcate, cpage) => {
    let res = await axios.get(
      `/api/api?type=apiUpcoming&shcate=${shcate}&cpage=${cpage}`
    );
    return res.data;
  },

  search: async (searchWord, page) => {
    let res = await axios.get(
      `/api/api?type=apiSearch&searchWord=${searchWord}&cpage=${page}`
    );
    return res.data;
  },

  detail: async (mt20id) => {
    let res = await axios.get(`/api/api?type=apiDetail&mt20id=${mt20id}`);
    return res.data;
  },
};
