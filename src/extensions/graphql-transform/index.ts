/* let data = {
  data: {
    articles: {
      data: [
        {
          id: "1",
          attributes: {
            title: "demo1",
            content: "# title\ndemo1\n**demo1**\n\n_demo1_",
            createdAt: "2022-12-23T09:59:46.347Z",
            updatedAt: "2022-12-23T12:47:38.563Z",
            publishedAt: "2022-12-23T10:02:40.958Z",
            logo: {
              data: {
                //id: "1",
                attributes: {
                  url: "/uploads/dog_6b884cec93.jpg",
                },
              },
            },
            category: {
              data: [
                {
                  id: "1",
                  attributes: {
                    name: "stripe",
                  },
                },
                {
                  id: "2",
                  attributes: {
                    name: "stripe2",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
};
let v = transformGraphql(data);
console.info(JSON.stringify(v)); */
/**
 * 格式化输出graphql数据
 * @param data
 */
export function transformGraphql(data: any) {
  data = data.data;
  let list: any[] = [];
  for (let key in data) {
    let item0 = data[key];
    let items = item0?.data || [];
    for (let item of items) {
      isNull(item) || list.push(transformGraphqlItem(item));
    }
  }
  return { data: list };
}
function transformGraphqlItem(data: any) {
  if (isUnit(data)) return data;
  if (data instanceof Array) {
    let list: any[] = [];
    for (let item of data) {
      let v = transformGraphqlItem(item);
      isNull(v) || list.push(v);
    }
    return list;
  } else {
    let ret: any = {};
    let hasId = false;
    if (!isNull(data.id)) {
      ret.id = data.id;
      hasId = true;
    }
    for (let key in data.attributes) {
      let attr = data.attributes[key];
      if (isNull(attr)) continue;
      let xf = typeof attr;
      if (["string", "number", "boolean"].includes(xf)) {
        ret[key] = attr;
      } else {
        let newAttr = transformGraphqlItem(attr.data);
        if (hasId) {
          ret[key] = newAttr;
        } else {
          if (newAttr.url && Object.keys(newAttr).length == 1) {
            ret[key] = newAttr.url;
          } else {
            ret[key] = newAttr;
          }
        }
      }
    }
    return ret;
  }
}
/* 
const ddd = {
  data: [
    {
      id: 1,
      attributes: {
        title: "demo1",
        content: "# title\ndemo1\n**demo1**\n\n_demo1_",
        createdAt: "2022-12-23T09:59:46.347Z",
        updatedAt: "2022-12-23T12:47:38.563Z",
        publishedAt: "2022-12-23T10:02:40.958Z",
        logo: {
          data: {
            id: 0,
            attributes: {
              name: "string",
              alternativeText: "string",
              caption: "string",
              width: 0,
              height: 0,
              url: "url",
            },
          },
        },
      },
    },
  ],
};
 */
/**
 * 格式化输出restful 数据
 * @param data
 */
export function transformRest(data: any) {
  data = data.data;
  console.info("rest", data);
  if (data instanceof Array) {
    let list: any = [];
    for (let item of data) {
      let v = transformRestItem(item);
      isNull(v) || list.push(v);
    }
    return {
      data: list,
    };
  } else {
    let ret: any = transformRestItem(data);
    return {
      data: ret,
    };
  }
}

function transformRestItem(data) {
  if (isNull(data)) return;
  if (isUnit(data)) return data;
  if (data instanceof Array) {
    let list: any[] = [];
    for (let item of data) {
      list.push(transformRestItem(item));
    }
    return list;
  } else {
    let ret: any = {};
    let hasId = false;
    if (!isNull(data.id)) {
      ret.id = data.id;
      hasId = true;
    }
    for (let key in data.attributes) {
      let attr = data.attributes[key];
      if (!attr) continue;
      let xf = typeof attr;
      if (["string", "number", "boolean"].includes(xf)) {
        ret[key] = attr;
      } else {
        if (!attr.data) continue;
        let newAttr = transformRestItem(attr.data);
        if (hasId) {
          ret[key] = newAttr;
        } else {
          if (newAttr.url && Object.keys(newAttr).length == 1) {
            ret[key] = newAttr.url;
          } else {
            ret[key] = newAttr;
          }
        }
      }
    }
    return ret;
  }
}
function isNull(v) {
  return v === undefined || v == null;
}
function isUnit(v) {
  return ["string", "number", "boolean"].includes(typeof v);
}
