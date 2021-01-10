/** 
 * @description  按需引入Vant
*/
import { 
  Icon, Button, Tabbar, TabbarItem, Search,
  Image as VanImage, SwipeCell, Badge, Swipe,
  SwipeItem, Sticky, Lazyload, Grid, GridItem,
  TreeSelect, Tab, Tabs, NavBar, Card, PullRefresh, Toast
} from 'vant'
const pluginsVant = [
  Button,
  Icon,
  Badge,
  Search,
  Tabbar,
  VanImage,
  Swipe,
  Grid,
  Tab,
  Tabs,
  Card,
  NavBar,
  GridItem,
  SwipeItem,
  SwipeCell,
  Sticky,
  Lazyload,
  TabbarItem,
  TreeSelect,
  PullRefresh,
  Toast
]
export const vantUI = {
  install: function(vm: any) {
    pluginsVant.forEach(item => {
      vm.component(item.name, item)
    })
  }
}
