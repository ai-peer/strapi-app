import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
/* import Antd from 'ant-design-vue'; // 引入组件库
import "ant-design-vue/dist/antd.css";
import {
   Button,
   message,
   Form,
   Input,
   Checkbox,
   Menu,
   Layout, //
   LayoutHeader,
   LayoutFooter,
   LayoutContent,
   LayoutSider,
   LayoutProps,
   Table,
   Select,
   DatePicker,
   Spin,
   Switch,
   Modal,
} from "ant-design-vue"; */
import naive from 'naive-ui'

import router from "./router";
import { setupI18n } from "./locales";
const app = createApp(App);

//app.config.globalProperties.$message = message;
//Object.assign(globalThis, )
/* Object.assign(globalThis, {
   vm: {
      message: message,
      modal: Modal,
   },
}); */
app.use(naive);
app.use(router);
setupI18n(app);
// 添加常用组件
/* app.use(Button)
   .use(Form) //
   .use(Switch)
   .use(Input)
   .use(Checkbox)
   .use(Menu)
   .use(Layout)
   .use(Table)
   .use(Select)
   .use(DatePicker)
   .use(Spin); */ // 自动注册这些组件下的子组件 例如Button下的Button.Group
   //app.use(Antd);
app.mount("#app");
