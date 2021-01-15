/** 
 * @description  按需引入Vant
*/
import { 
  Icon, Button, Tabbar, TabbarItem, Search, Toast,
  Image as VanImage, SwipeCell, Badge, Swipe, Empty,
  SwipeItem, Sticky, Lazyload, Grid, GridItem, Loading, Divider,
  TreeSelect, Tab, Tabs, NavBar, Card, PullRefresh, ImagePreview,
  ActionBar, ActionBarIcon, ActionBarButton, ShareSheet, AddressList, AddressEdit
} from 'vant'
const pluginsVant = [
  Icon,
  Button,
  Badge,
  Search,
  Tabbar,
  Empty,
  Swipe,
  Grid,
  Tab,
  Tabs,
  Card,
  Toast,
  NavBar,
  Loading,
  Divider,
  VanImage,
  GridItem,
  SwipeItem,
  SwipeCell,
  Sticky,
  Lazyload,
  TabbarItem,
  TreeSelect,
  PullRefresh,
  ImagePreview,
  ActionBar,
  ShareSheet,
  ActionBarIcon,
  ActionBarButton,
  AddressList,
  AddressEdit
]
export const vantUI = {
  install: function(vm: any) {
    pluginsVant.forEach(item => {
      vm.component(item.name, item)
    })
  }
}
