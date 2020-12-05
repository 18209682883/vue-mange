//引入vue
import Vue from 'vue'

//引入Vuex
import store from "./store"


//创建自定义的指令
Vue.directive("auth", {
    inserted: function (el,binding) { 
        //获取ruleNames规则
        const rule =  store.getters.getUser.ruleNames;
        //在ruleName规则里面查找自定义指定所绑定的规则
       const bool = rule.includes(binding.value)
        //判断返回值是否为true,如果是true的话,则表示改用户有添加角色的权限,如果是false则表示没有添加角色的权限
        if(!bool){
            el.parentElement.removeChild(el);
        }
    },
})