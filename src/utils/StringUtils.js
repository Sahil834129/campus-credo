export default class StringUtils {
    static replaceUnderScoreWithSpace(str) {
        return str.replaceAll('_', ' ');
    }

    static capitalizeFirstLetter(str) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static append(parentStr, strToAppend, delimitter) {
        if (parentStr)
            return parentStr + delimitter + ' ' +strToAppend
        return strToAppend
    }
}