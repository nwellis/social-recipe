import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleUser, faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faRightFromBracket, faThumbTack, faUtensils
} from '@fortawesome/free-solid-svg-icons';

/**
 * @see https://fontawesome.com/search?o=r&m=free
 */
export const AppFontAwesomeIcons = {
  Exit: faRightFromBracket,
  ThumbTack: faThumbTack,
  Trash: faTrashCan,
  GitHub: faGithub,
  User: faCircleUser,
  Utensils: faUtensils,
}

export function initIcons() {
  Object.values(AppFontAwesomeIcons).forEach(definition => library.add(definition))
  // config.autoAddCss = false
}