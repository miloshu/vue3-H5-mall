/** 
 * @description  按需引入Vant
*/
import { Icon, Button, Tabbar, TabbarItem, Search, Image as VanImage, SwipeCell, Badge, Swipe, SwipeItem, Sticky } from 'vant'
const pluginsVant = [
  Button,
  Icon,
  Badge,
  Search,
  Tabbar,
  VanImage,
  Swipe,
  SwipeItem,
  SwipeCell,
  Sticky,
  TabbarItem
]
export const vantUI = {
  install: function(vm: any) {
    pluginsVant.forEach(item => {
      vm.component(item.name, item)
    })
  }
}
