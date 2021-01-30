/** 
 * @description  按需引入Vant
*/
import { 
  Icon, Button, Tabbar, TabbarItem, Search, Toast, Form, SubmitBar,
  Image as VanImage, SwipeCell, Badge, Swipe, Empty, Checkbox, CheckboxGroup,
  SwipeItem, Sticky, Lazyload, Grid, GridItem, Loading, Divider, Stepper, Dialog,
  TreeSelect, Tab, Tabs, NavBar, Card, PullRefresh, ImagePreview, ContactCard,
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
  Form,
  Toast,
  Dialog,
  NavBar,
  Loading,
  Divider,
  VanImage,
  GridItem,
  SwipeItem,
  SwipeCell,
  Sticky,
  Stepper,
  SubmitBar,
  Lazyload,
  TabbarItem,
  TreeSelect,
  PullRefresh,
  Checkbox,
  CheckboxGroup,
  ImagePreview,
  ContactCard,
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
