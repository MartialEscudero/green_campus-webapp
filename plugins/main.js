import Vue from 'vue'

// https://leafletjs.com
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// https://github.com/surmon-china/vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'

// https://github.com/freearhey/vue2-filters
import Vue2Filters from 'vue2-filters'

// https://github.com/miaolz123/vue-markdown
import VueMarkdown from 'vue-markdown';

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

// https://github.com/gruhn/vue-qrcode-reader
import VueQrcodeReader from "vue-qrcode-reader";

Vue.use(VueQrcodeReader)

Vue.use(VueAwesomeSwiper /* { default options with global component } */)
Vue.use(Vue2Filters)

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('vue-markdown', VueMarkdown);

Vue.config.productionTip = false