import dayjs from "dayjs"
import utcPlugin from "dayjs/plugin/utc.js"
import tzPlugin from "dayjs/plugin/timezone.js"
import localizeFormatPlugin from "dayjs/plugin/localizedFormat.js"

dayjs.extend(utcPlugin)
dayjs.extend(tzPlugin)
dayjs.extend(localizeFormatPlugin)

export { dayjs }