import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from "@fortawesome/fontawesome-svg-core";
// import { } from '@fortawesome/free-solid-svg-icons';
import {
  faCircleUser, faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

/**
 * @see https://fontawesome.com/search?o=r&m=free
 */
export const AppFontAwesomeIcons = {
  Exit: faRightFromBracket,
  Trash: faTrashCan,
  GitHub: faGithub,
  User: faCircleUser,
}

export function initIcons() {
  Object.values(AppFontAwesomeIcons).forEach(definition => library.add(definition))
  // config.autoAddCss = false
}