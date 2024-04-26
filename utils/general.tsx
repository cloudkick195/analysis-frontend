import moment from "moment";
import { useState, useEffect } from "react";
import { CDNVariableEnum, ListOrder, ListStatus, StatusEnum } from "./enum";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  var windowInf: any = {}
  if (typeof window !== "undefined") {
    windowInf = window
  }

  useEffect(() => {
    setWindowDimensions({ width: windowInf.innerWidth, height: windowInf.innerHeight });

    const handleResize = () => {
      setWindowDimensions({ width: windowInf.innerWidth, height: windowInf.innerHeight });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowInf]);

  return windowDimensions;
}

export const formatTime = (seconds: any) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + " ngày " : "";
  var hDisplay = h > 0 ? h + " giờ " : "";
  var mDisplay = m > 0 ? m + " phút " : "";
  var sDisplay = s > 0 ? s + " giây" : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

export const formatDate = (time: any) => {
  return moment(time).format('DD-MM-yyyy HH:mm:ss')
}

export const renderStatus = (status: any) => {
  const statusMapping = ListStatus.find((item: any) => item.value === status)
  return <span><span className={`label font-weight-bold label-lg label-light-${status === StatusEnum.ACTIVE ? 'warning' : 'danger'} label-inline`}>{statusMapping?.label}</span></span>
}

export const compareDate = (startTime: any, endTime: any) => {
  if (startTime && endTime) {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const current: any = moment()
    if (current.isAfter(start) === true && current.isBefore(end) === true) {
      return true
    }
  }
  return false
}

const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
  const isSSR = () => Boolean(userAgent.match(/SSR/i))
  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
  const isDesktop = () => Boolean(!isMobile() && !isSSR())

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  }
}

export const useMobileDetect = () => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  return getMobileDetect(userAgent)
}

export const showError = (obj: Record<string, string>, sep: string) => {
  let str = "";
  Object.keys(obj).map((i, index) => {
    if (index === 0) {
      str += obj[i];
    } else {
      str += `${sep}${obj[i]}`;
    }
    return str;
  });
  return str;
};

export const currencyFormat = (number: any) => {
  return parseFloat(parseFloat(number).toFixed(0))
}

export const VNDFormat = (number: any) => {
  const tnumber: any = number * 1000
  return `${numberWithCommas(parseFloat(parseFloat(tnumber).toFixed(2)))} VND`
}

export const convertToParameters = (paramsPass: any) => {
  return Object.keys(paramsPass).map(key => key + '=' + paramsPass[key]).join('&');
}

export const blockInvalidChar = (e: any) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export const numberWithCommas = (number: any) => {
  if (number) {
    return Number.parseFloat(number).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return 0
}

// This function converts the string to lowercase, then perform the conversion
export const toLowerCaseNonAccentVietnamese = (str: any) => {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

// This function keeps the casing unchanged for str, then perform the conversion
export const toNonAccentVietnamese = (str: any) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const sortByKey = (data: any, key: string, type: string, status: number) => {
  if (ListOrder[status] === ListOrder[0]) return data
  const newData = [...data]
  let sortedData
  if (type === 'number') {
    sortedData = newData.sort((a: any, b: any) => {
      return ListOrder[status] === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    })
  } else {
    sortedData = newData.sort((a: any, b: any) => {
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();

      if (x > y) return ListOrder[status] === 'ASC' ? 1 : -1
      if (x < y) return ListOrder[status] === 'ASC' ? -1 : 1
      return 0;
    });
  }
  return sortedData;
}

export const sortArrayByKey = (data: any, key: string, orderMethod: string, type?: string) => {
  const newData = [...data]
  let sortedData
  if (type === 'number') {
    sortedData = newData.sort((a: any, b: any) => {
      return orderMethod === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    })
  } else {
    sortedData = newData.sort((a: any, b: any) => {
      let x = toLowerCaseNonAccentVietnamese(a[key]);
      let y = toLowerCaseNonAccentVietnamese(b[key]);

      if (x > y) return orderMethod === 'ASC' ? 1 : -1
      if (x < y) return orderMethod === 'ASC' ? -1 : 1
      return 0;
    });
  }
  return sortedData;
}

export const getRndInteger = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getCDNVariable = (cdn: string, variable?: string) => {
  switch (variable) {
    case CDNVariableEnum.BACKGROUND:
      return cdn.replace(`/${CDNVariableEnum.PUBLIC}`, `/${CDNVariableEnum.BACKGROUND}`).replace(`/${CDNVariableEnum.BANNER}`, `/${CDNVariableEnum.BACKGROUND}`).replace(`/${CDNVariableEnum.MOBILE}`, `/${CDNVariableEnum.BACKGROUND}`).replace(`/${CDNVariableEnum.FOOTERICON}`, `/${CDNVariableEnum.BACKGROUND}`)
    case CDNVariableEnum.BANNER:
      return cdn.replace(`/${CDNVariableEnum.PUBLIC}`, `/${CDNVariableEnum.BANNER}`).replace(`/${CDNVariableEnum.BACKGROUND}`, `/${CDNVariableEnum.BANNER}`).replace(`/${CDNVariableEnum.MOBILE}`, `/${CDNVariableEnum.BANNER}`).replace(`/${CDNVariableEnum.FOOTERICON}`, `/${CDNVariableEnum.BANNER}`)
    case CDNVariableEnum.MOBILE:
      return cdn.replace(`/${CDNVariableEnum.PUBLIC}`, `/${CDNVariableEnum.MOBILE}`).replace(`/${CDNVariableEnum.BACKGROUND}`, `/${CDNVariableEnum.MOBILE}`).replace(`/${CDNVariableEnum.BANNER}`, `/${CDNVariableEnum.MOBILE}`).replace(`/${CDNVariableEnum.FOOTERICON}`, `/${CDNVariableEnum.MOBILE}`)
    case CDNVariableEnum.FOOTERICON:
      return cdn.replace(`/${CDNVariableEnum.PUBLIC}`, `/${CDNVariableEnum.FOOTERICON}`).replace(`/${CDNVariableEnum.BACKGROUND}`, `/${CDNVariableEnum.FOOTERICON}`).replace(`/${CDNVariableEnum.BANNER}`, `/${CDNVariableEnum.FOOTERICON}`).replace(`/${CDNVariableEnum.MOBILE}`, `/${CDNVariableEnum.FOOTERICON}`)
    default:
      return cdn.replace(`/${CDNVariableEnum.BACKGROUND}`, `/${CDNVariableEnum.PUBLIC}`).replace(`/${CDNVariableEnum.BANNER}`, `/${CDNVariableEnum.PUBLIC}`).replace(`/${CDNVariableEnum.MOBILE}`, `/${CDNVariableEnum.PUBLIC}`).replace(`/${CDNVariableEnum.FOOTERICON}`, `/${CDNVariableEnum.PUBLIC}`)
  }
}

export const generateSlugFromTitle = (title: string) => {
  return toLowerCaseNonAccentVietnamese(title).replace(/ /g, '-')
}

export const buildQueries = (query:any, notInclude:Array<string>) => {
  const queries:Array<string> = []

  for (const key in query) {
    if(!key || ['total', 'id', "offset", ...notInclude].includes(key)) continue
    if(!Object.prototype.hasOwnProperty.call(query, key)) continue
    if(!query[key]) continue

    queries.push(`${key}=${query[key]}`);
  }
  
  return {
    queriesFull: queries.length == 1 ? queries[0] : queries.join("&"),
    queries: queries
  }

}