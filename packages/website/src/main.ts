import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
//import Antd from 'ant-design-vue'; // 引入组件库
import {
   create,
   useMessage,
   useDialog,
   NButton,
   NForm,
   NInput,
   NCheckbox,
   NMenu,
   NLayout, //
   NTable,
   NSelect,
   NDatePicker,
   NSpin,
   NSwitch,
   NModal,
} from "naive-ui";
import router from "./router";
import { setupI18n } from "./locales";
import { userModel } from '../../../../../temp/soybean-admin/mock/model/auth';
const app = createApp(App);

app.config.globalProperties.$message = useMessage();
//Object.assign(globalThis, )
Object.assign(globalThis, {
   vm: {
      message: useMessage(),
      modal: useDialog(),
   },
});

app.use(router);
setupI18n(app);

const naive = create({
   components: [
      NButton,
      NForm,
      NInput,
      NCheckbox,
      NMenu,
      NLayout, //
      NTable,
      NSelect,
      NDatePicker,
      NSpin,
      NSwitch,
      NModal,
   ],
}); /* 
// 添加常用组件
app.use(Button)
   .use(Form) //
   .use(Switch)
   .use(Input)
   .use(Checkbox)
   .use(Menu)
   .use(Layout)
   .use(Table)
   .use(Select)
   .use(DatePicker)
   .use(Spin); // 自动注册这些组件下的子组件 例如Button下的Button.Group */
app.use(naive);
app.mount("#app");
