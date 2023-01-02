/* let data = {
   data: {
      articles: {
         data: [
            {
               id: "1",
               attributes: {
                  title: "demo1",
                  content: "# title\ndemo1\n**demo1**\n\n_demo1_",
                  logo: {
                     data: {
                        attributes: {
                           url: "/uploads/dog_6b884cec93.jpg",
                           __typename: "UploadFile",
                        },
                        __typename: "UploadFileEntity",
                     },
                     __typename: "UploadFileEntityResponse",
                  },
                  category: {
                     data: {
                        id: "1",
                        attributes: { name: "stripe", __typename: "Category" },
                        __typename: "CategoryEntity",
                     },
                     __typename: "CategoryEntityResponse",
                  },
                  __typename: "Article",
               },
               __typename: "ArticleEntity",
            },
         ],
         __typename: "ArticleEntityResponseCollection",
      },
   },
};
 */
/**
 * 格式化输出graphql数据
 * @param data
 */
export function transformGraphql(data: any) {
   data = data.data;
   let ret: any = {};
   for (let key in data) {
      let item0 = data[key];
      if (isUnit(item0)) {
         ret[key] = item0;
      } else {
         let items = item0?.data || [];
         ret[key] = ret[key] || [];
         for (let item of items) {
            isNull(item) || ret[key].push(transformGraphqlItem(item));
         }
      }
   }
   return { data: ret };
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
         if (/^__/i.test(key)) continue;
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
         if (/^__/i.test(key)) continue;
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
