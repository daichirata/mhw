import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import fontawesome from "@fortawesome/fontawesome";

import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";

fontawesome.library.add(solid, regular);

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
