class Utils {

  isOnMobile = (author, args = []) => { // Because buttons are bugs on mobile
    if (args.length) {
      return true;
    } else {
      if ( author.presence.status === "offline" || author.presence.clientStatus["mobile"] ) {
        return true;
      } else if ( !author.presence.clientStatus["mobile"] && ( author.presence.clientStatus["desktop"] || author.presence.clientStatus["web"] ) ) {
        return false;
      }
    }
  };
}

module.exports = Utils;
